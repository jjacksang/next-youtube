import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchYoutubeVideos } from '../utils/api';
import { processVideoData } from '../utils/process-video-data';
import { IChannel, IEnrichedVideo } from '../utils/type';
import { useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

type YoutubeItems = (IEnrichedVideo | IChannel)[];

export interface InitialYoutubeData {
  items: YoutubeItems;
  nextPageToken?: string;
}

interface ProcessedYoutubePageData {
  videos: IEnrichedVideo[];
  channels: IChannel[];
  nextPageToken?: string;
}

interface UseSearchInfiniteQueryReturn {
  allVideos: IEnrichedVideo[];
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

export default function useSearchInfinietQuery(
  searchParams: string,
  initialData: InitialYoutubeData,
): UseSearchInfiniteQueryReturn {
  // 무한스크롤 감지
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const existingVideoIds = useRef<Set<string>>(new Set());

  const initialFilteredVideos: IEnrichedVideo[] = [];
  const initailFilteredChannels: IChannel[] = [];

  if (initialData?.items) {
    for (const item of initialData.items) {
      if (item.id.kind === 'youtube#channel') {
        initailFilteredChannels.push(item as IChannel);
      } else {
        const video = item as IEnrichedVideo;
        if (!existingVideoIds.current.has(video.id.videoId)) {
          existingVideoIds.current.add(video.id.videoId);
          initialFilteredVideos.push(video);
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
      const collectedVideos: IEnrichedVideo[] = [];
      const collectedChannels: IChannel[] = [];
      let nextPageToken = pageParam as string | undefined;

      const MAX_ATTEMPTS = 5;
      const attemptCount = 0;

      const remainingToFetch = targetCount;

      while (
        collectedVideos.length < targetCount &&
        attemptCount < MAX_ATTEMPTS
      ) {
        const response = await fetchYoutubeVideos({
          q: searchParams,
          maxResults: remainingToFetch,
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

        const newVideos: IEnrichedVideo[] = [];
        const newChannels: IChannel[] = [];

        nextPageToken = newToken;

        for (const item of videoWithViewCount) {
          if (item.id.kind === 'youtube#channel') {
            newChannels.push(item as IChannel);
            continue;
          }

          const video = item as IEnrichedVideo;
          if (!existingVideoIds.current.has(video.id.videoId)) {
            newVideos.push(video);
            existingVideoIds.current.add(video.id.videoId);
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
                (item): item is IEnrichedVideo =>
                  item.id.kind !== 'youtube#channel',
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

  const allVideos = useMemo((): IEnrichedVideo[] => {
    if (!data?.pages) {
      console.log('allVideos is empty');
      return [];
    }
    const videos = data.pages.flatMap(page => page.videos);
    console.log('all videos count : ', videos.length);
    return videos;
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
