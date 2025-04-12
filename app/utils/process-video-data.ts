import { fetchVideoDetails } from "./api";
import { IChannel, IEnrichedVideo, Video } from "./type";

interface YoutubeResponse {
    items: SearchResultItem[];
    nextPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}

type SearchResultItem = Video | IChannel;

export async function processVideoData(searchResults: YoutubeResponse) {
    // searchResults에 대한 상세정보를 통해 viewCount를 받아와
    // VideoItem컴포넌트에 전달
    console.log("searchResults!!", searchResults);

    try {
        const isVideos = (item: SearchResultItem): item is Video =>
            item.id?.kind === "youtube#video" && "videoId" in item.id;
        const isChannel = (item: SearchResultItem): item is IChannel =>
            item.id?.kind === "youtube#channel" && "channelId" in item.id;

        const videoItems = searchResults.items.filter(isVideos);
        const channelItem = searchResults.items.filter(isChannel);
        console.log("video Items", videoItems);
        console.log("channel data : ", channelItem);
        console.log("process-video-data", searchResults.nextPageToken);

        let processedVideoViewCount: IEnrichedVideo[] = [];
        if (videoItems.length > 0) {
            const videoViewCountPromises = videoItems.map((item: Video) => {
                try {
                    return fetchVideoDetails({ id: item.id.videoId });
                } catch (error) {
                    console.error(
                        `videoViewCountPromises / Error fetching videoDetails ${item.id.videoId}: `,
                        error
                    );
                    return { items: { viewCount: "0" } };
                }
            });

            const videoViewCount = await Promise.all(videoViewCountPromises);

            processedVideoViewCount = videoItems.map((item, idx) => ({
                ...item,
                viewCount: parseInt(
                    videoViewCount[idx]?.items?.[0].statistics?.viewCount ?? "0"
                ),
            }));
        }

        const combinedItems: (IEnrichedVideo | IChannel)[] = [
            ...processedVideoViewCount,
            ...channelItem,
        ];

        return {
            videoWithViewCount: combinedItems,
            nextPageToken: searchResults.nextPageToken || "",
        };
    } catch (error) {
        console.error("Error in processVideoData: ", error);

        return {
            videoWithViewCount: [],
            nextPageToken: searchResults.nextPageToken || "",
        };
    }
}
