import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchYoutubeVideos } from "../utils/api";
import { processVideoData } from "../utils/process-video-data";
import { IChannel, IEnrichedVideo, PlayList, Video } from "../utils/type";
import { useMemo } from "react";

type SearchResultItem = Video | PlayList | IChannel;

interface YoutubeResponse {
    items: SearchResultItem[];
    nextPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}

interface IProcessedData {
    videoWithViewCount: (IEnrichedVideo | IChannel)[];
    nextPageToken?: string;
}

export default function useSearchInfinietQuery(searchParams: string) {
    const { status, data, error, isFetching, fetchNextPage } = useInfiniteQuery(
        {
            queryFn: async ({ pageParam }) => {
                const response = await fetchYoutubeVideos({
                    q: searchParams,
                    maxResults: 24,
                    nextPageToken: pageParam as string | undefined,
                });

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
            initialPageParam: undefined,
        }
    );

    const allVideos: IEnrichedVideo[] = useMemo(() => {
        if (!data?.pages) return [];

        return data.pages.flatMap((page) => page.items || []);
    }, [data?.pages]);
    return {
        data: allVideos,
    };
}
