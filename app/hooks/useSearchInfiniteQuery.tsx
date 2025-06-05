import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchYoutubeVideos } from '../utils/api';
import { processVideoData } from '../utils/process-video-data';
import { IChannel, IEnrichedVideo } from '../utils/type';
import { useMemo } from 'react';

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
      try {
        const response = await fetchYoutubeVideos({
          q: searchParams,
          maxResults: 24,
          nextPageToken: pageParam as string,
        });

        if (!response.ok) {
          console.error('API Error:', response.status, response.statusText);
          throw new Error(
            `Failed to fetch Youtube videos: ${response.status}, ${response.statusText}`,
          );
        }

        const searchResults = await response.json();

        const { videoWithViewCount, nextPageToken } =
          await processVideoData(searchResults);

        console.log('Process Video Data!!!!!!! : ', videoWithViewCount);

        const videos = videoWithViewCount.filter(
          (item): item is IEnrichedVideo => item.id.kind !== 'youtube#channel',
        );

        const channels = videoWithViewCount.filter(
          (item): item is IChannel => item.id.kind === 'youtube#channel',
        );

        return {
          channels,
          videos,
          nextPageToken,
        };
      } catch (error) {
        console.error('Error in useInfiniteQuery queryFn : ', error);
        throw error;
      }
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
