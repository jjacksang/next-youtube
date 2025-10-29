import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchYoutubeVideos } from '../utils/api';
import { processVideoData } from '../utils/process-video-data';
import { IChannel, IEnrichedPlaylist, IEnrichedVideo } from '../utils/type';
import { useMemo, useRef } from 'react';

type YoutubeItems = (IEnrichedVideo | IEnrichedPlaylist | IChannel)[];

export interface InitialYoutubeData {
  items: YoutubeItems;
  nextPageToken?: string;
}

interface ProcessedYoutubePageData {
  videos: (IEnrichedVideo | IEnrichedPlaylist)[];
  channels: IChannel[];
  nextPageToken?: string;
}

interface UseSearchInfiniteQueryReturn {
  allVideos: (IEnrichedVideo | IEnrichedPlaylist)[];
  allChannels: IChannel[];

  status: 'error' | 'pending' | 'success';
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: Error | null;

  fetchNextPage: () => void;

  currentPageToken?: string;
  totalPages: number;
}

export default function useSearchInfiniteQuery(
  searchParams: string,
  initialData: InitialYoutubeData,
): UseSearchInfiniteQueryReturn {
  const existingVideoIds = useRef<Set<string>>(new Set());

  const initialFilteredVideos: (IEnrichedVideo | IEnrichedPlaylist)[] = [];
  const initialFilteredChannels: IChannel[] = [];

  if (initialData?.items) {
    for (const item of initialData.items) {
      if (item.id.kind === 'youtube#channel') {
        initialFilteredChannels.push(item as IChannel);
      } else {
        const id =
          item.id.kind === 'youtube#video'
            ? item.id.videoId
            : item.id.kind === 'youtube#playlist'
              ? item.id.playlistId
              : undefined;

        if (id && !existingVideoIds.current.has(id)) {
          existingVideoIds.current.add(id);
          initialFilteredVideos.push(
            item as IEnrichedVideo | IEnrichedPlaylist,
          );
        }
      }
    }
  }

  const {
    status,
    data,
    error,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<ProcessedYoutubePageData>({
    queryKey: ['videos', searchParams],
    queryFn: async ({ pageParam }) => {
      console.log(pageParam);
      const targetCount = 24;
      const collectedVideos: (IEnrichedVideo | IEnrichedPlaylist)[] = [];
      const collectedChannels: IChannel[] = [];
      let nextPageToken = pageParam as string | undefined;

      const MAX_ATTEMPTS = 5;
      let attemptCount = 0;

      while (
        collectedVideos.length < targetCount &&
        attemptCount < MAX_ATTEMPTS
      ) {
        const response = await fetchYoutubeVideos({
          q: searchParams,
          maxResults: targetCount - collectedVideos.length,
          nextPageToken,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`,
          );
        }

        const searchResults = await response.json();
        const { videoWithViewCount, nextPageToken: newToken } =
          await processVideoData(searchResults);

        const newVideos: (IEnrichedVideo | IEnrichedPlaylist)[] = [];
        const newChannels: IChannel[] = [];

        nextPageToken = newToken;
        attemptCount++;

        for (const item of videoWithViewCount) {
          if (item.id.kind === 'youtube#channel') {
            newChannels.push(item as IChannel);
            continue;
          }

          const id =
            item.id.kind === 'youtube#video'
              ? item.id.videoId
              : item.id.kind === 'youtube#playlist'
                ? item.id.playlistId
                : undefined;
          if (id && !existingVideoIds.current.has(id)) {
            newVideos.push(item as IEnrichedVideo | IEnrichedPlaylist);
            existingVideoIds.current.add(id);
          }
        }

        collectedVideos.push(...newVideos);
        collectedChannels.push(...newChannels);
      }

      return {
        videos: collectedVideos.slice(0, targetCount),
        channels: collectedChannels,
        nextPageToken,
      };
    },

    getNextPageParam: lastPage => {
      return lastPage.nextPageToken || undefined;
    },

    initialPageParam: undefined,
    initialData: initialData
      ? {
          pages: [
            {
              channels: initialData.items.filter(
                (item): item is IChannel => item.id.kind === 'youtube#channel',
              ),
              videos: initialData.items.filter(
                (item): item is IEnrichedVideo | IEnrichedPlaylist =>
                  item.id.kind === 'youtube#video' ||
                  item.id.kind === 'youtube#playlist',
              ),
              nextPageToken: initialData.nextPageToken,
            },
          ],
          pageParams: [undefined],
        }
      : undefined,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분

    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const allVideos = useMemo((): (IEnrichedVideo | IEnrichedPlaylist)[] => {
    if (!data?.pages) {
      console.log('allVideos is empty');
      return [];
    }
    return data.pages.flatMap(page => page.videos);
  }, [data?.pages]);

  const allChannels = useMemo((): IChannel[] => {
    if (!data?.pages) {
      console.log('allChannel is empty');
      return [];
    }

    const channels = data.pages.flatMap(page => page.channels);
    console.log('all channels count :', channels.length);
    return channels;
  }, [data?.pages]);

  const currentPageToken = useMemo(() => {
    if (!data?.pages || data.pages.length === 0) return undefined;
    return data.pages[data.pages.length - 1].nextPageToken;
  }, [data?.pages]);

  return {
    // 데이터
    allChannels,
    allVideos,

    // 상태
    status,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error: error as Error | null,

    // 액션함수
    fetchNextPage,

    currentPageToken,
    totalPages: data?.pages?.length || 0,
  };
}
