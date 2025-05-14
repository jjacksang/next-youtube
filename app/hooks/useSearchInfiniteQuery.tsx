import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchYoutubeVideos } from "../utils/api";
import { processVideoData } from "../utils/process-video-data";
import { IChannel, IEnrichedVideo, PlayList, Video } from "../utils/type";
import { useMemo } from "react";

type YoutubeItems = (IEnrichedVideo | IChannel)[];

export default function useSearchInfinietQuery(
    searchParams: string,
    initialVideos: YoutubeItems,
    nextPageToken: string
) {
    const {
        status,
        data,
        error,
        isFetching,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryFn: async ({ pageParam }) => {
            const response = await fetchYoutubeVideos({
                q: searchParams,
                maxResults: 24,
                nextPageToken: pageParam as string | undefined,
            });

            if (!response.ok) return;

            const { videoWithViewCount, nextPageToken } =
                await processVideoData(response);

            return {
                ...response,
                processedItems: videoWithViewCount,
                nextPageToken: nextPageToken,
            };
        },
        getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
        queryKey: ["videos", searchParams],
        initialPageParam: initialVideos
            ? {
                  pages: [
                      {
                          items: initialVideos,
                          nextPageToken: nextPageToken,
                      },
                  ],
                  pageParams: [undefined],
              }
            : undefined,
    });

    const allVideos: IEnrichedVideo[] = useMemo(() => {
        if (!data?.pages) return [];

        return data.pages.flatMap((page) => page.items || []);
    }, [data?.pages]);
    return {
        data: allVideos,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
    };
}
