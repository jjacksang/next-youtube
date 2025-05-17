import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchChannelDetails, fetchYoutubeVideos } from "../utils/api";
import { processVideoData } from "../utils/process-video-data";
import {
    IChannel,
    IChannelDetail,
    IEnrichedVideo,
    Thumbnail,
    Video,
} from "../utils/type";
import { useMemo } from "react";

type YoutubeItems = (IEnrichedVideo | IChannel)[];

interface ISearchProps extends YoutubeItems {
    channelThumbnail: {
        default: Thumbnail;
        high: Thumbnail;
        medium: Thumbnail;
    };
}

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

            if (!response.ok) {
                console.error(status);
                throw new Error();
            }

            const channelIds = [
                ...new Set(
                    response.items
                        .map((item: Video) => item.snippet.channelId)
                        .filter(
                            (id: string): id is string => typeof id === "string"
                        )
                ),
            ] as string[];

            const channelThumbnails: IChannel = await fetchChannelDetails({
                id: channelIds,
            });

            const { videoWithViewCount, nextPageToken } =
                await processVideoData(response);

            const enrichedVideos = videoWithViewCount.map((video) => {
                console.log(channelThumbnails);
                return {
                    ...video,
                    channelThumbnail:
                        channelThumbnails.id.channelId ==
                        video.snippet.channelId
                            ? channelThumbnails.snippet.thumbnails.default.url
                            : null,
                };
            });

            console.log(enrichedVideos);

            return {
                ...response,
                processedItems: enrichedVideos,
                nextPageToken: nextPageToken,
                channelThumbnails: channelThumbnails,
            };
        },
        getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
        queryKey: ["videos", searchParams],
        initialPageParam: undefined,
        initialData: initialVideos
            ? {
                  pages: [
                      {
                          items: initialVideos.map((video) => ({
                              ...video,
                              channelThumbnail: null,
                          })),
                          nextPageToken: nextPageToken,
                      },
                  ],
                  pageParams: [undefined],
              }
            : undefined,
    });

    console.log(data);

    const allVideos: ISearchProps[] = useMemo(() => {
        if (!data?.pages) return [];

        return data.pages.flatMap((page) => page.items || []);
    }, [data?.pages]);

    return {
        data: allVideos,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        test: data,
    };
}
