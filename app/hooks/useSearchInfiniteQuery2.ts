import { useInfiniteQuery } from '@tanstack/react-query';
import { Video } from '../components/video/video-item2';
import { fetchSearchVideos } from '../services/fetchSearch';
import { parseJson } from '../utils/fetcher';
import { fetchVideoDetails } from '../services/fetchVideoDetail';
import { fetchChannelDetails } from '../services/fetchChannelDetails';

interface InitialYoutubeVideos {
  items: Video[];
  nextPageToken: string;
}

interface ProcessedYoutubePageData {
  videos: Video[];
  nextPageToken?: string;
}

interface UseSearchInfiniteQueryReturn {
  videos: Video[];

  status: 'error' | 'pending' | 'success';
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: Error | null;

  fetchNextPage: () => void;

  currentPageToken?: string;
  totalPages: number;
}

export default function useSearchInfiniteQuery2(
  searchParams: string,
  initialVideos: InitialYoutubeVideos,
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
      let nextPageToken = pageParam as string | undefined;

      const response = await fetchSearchVideos({
        q: searchParams,
        maxResults: 24,
        order: 'date',
        nextPageToken,
      });

      const results = await parseJson(response);
      console.log(results);

      // video id목록 추출 후 detail 요청
      const ids = results.items.map(({ id }) => id.videoId);
      const detailResponse = await fetchVideoDetails({ ids });
      const parsedDetail = await parseJson(detailResponse);

      // channel id목록 추출 후 thumbnails 요청
      const channelIds = parsedDetail.items.map(id => id.snippet.channelId);
      const channelDetailsResponse = await fetchChannelDetails({ channelIds });
      const parsedChannelDetails = await parseJson(channelDetailsResponse);

      const channelThumbnailMap = parsedChannelDetails.items.reduce(
        (acc, { id, snippet }) => {
          acc[id] = snippet.thumbnails.default.url ?? null;
          return acc;
        },
        {} as Record<string, string | null>,
      );

      type SearchVideos = {
        id: string;
        channelId: string;
        description: string;
        thumbnailUrl: string;
        channelThumbnailUrl: string | null;
        title: string;
        channelTitle: string;
        viewCount: number;
        publishTime: string;
      };

      return {
        videos: parsedDetail.items.map(({ id, snippet, statistics }) => ({
          id: id,
          channelId: snippet.channelId,
          description: snippet.description,
          thumbnailUrl: snippet.thumbnails.medium.url,
          channelThumbnailUrl: channelThumbnailMap[snippet.channelId] ?? null,
          title: snippet.title,
          channelTitle: snippet.channelTitle,
          viewCount: statistics.viewCount,
          publishTime: snippet.publishedAt,
        })),
        nextPageToken: results.nextPageToken,
      };
    },
    getNextPageParam: lastPage => lastPage.nextPageToken || undefined,
    initialPageParam: initialVideos.nextPageToken,
    initialData: initialVideos
      ? {
          pages: [
            {
              videos: initialVideos.items,
              nextPageToken: initialVideos.nextPageToken,
            },
          ],
          pageParams: [undefined],
        }
      : undefined,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000,
  });

  const videos = data?.pages?.flatMap(page => page.videos);

  return {
    videos,
    status,
    error,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    totalPages: data?.pages?.length || 0,
  };
}
