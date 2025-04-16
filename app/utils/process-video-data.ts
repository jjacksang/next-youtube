import { fetchPlaylistDetails, fetchVideoDetails } from "./api";
import { IChannel, IEnrichedVideo, PlayList, Video } from "./type";

interface YoutubeResponse {
    items: SearchResultItem[];
    nextPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}

type SearchResultItem = Video | PlayList | IChannel;

export async function processVideoData(searchResults: YoutubeResponse) {
    // searchResults에 대한 상세정보를 통해 viewCount를 받아와
    // VideoItem컴포넌트에 전달
    console.log("searchResults!!", searchResults);

    try {
        const isVideos = (item: SearchResultItem): item is Video | PlayList => {
            return (
                (item.id?.kind === "youtube#video" && "videoId" in item.id) ||
                (item.id?.kind === "youtube#playlist" &&
                    "playlistId" in item.id)
            );
        };
        const isChannel = (item: SearchResultItem): item is IChannel =>
            item.id?.kind === "youtube#channel" && "channelId" in item.id;

        const videoItems = searchResults.items.filter(isVideos);
        const channelItem = searchResults.items.filter(isChannel);
        console.log("video Items", videoItems);
        console.log("channel data : ", channelItem);
        console.log("process-video-data", searchResults.nextPageToken);

        let processedVideoViewCount: IEnrichedVideo[] = [];
        if (videoItems.length > 0) {
            const videoViewCountPromises = videoItems.map(
                (item: Video | PlayList) => {
                    try {
                        if (
                            item.id.kind === "youtube#video" &&
                            "videoId" in item.id
                        ) {
                            console.log(`item중 video항목이 있습니다 ${item}`);
                            return fetchVideoDetails({ id: item.id.videoId });
                        } else if (
                            item.id.kind === "youtube#playlist" &&
                            "playlist" in item.id
                        ) {
                            console.log(
                                `item중 playlist 항목이 있습니다 ${item}`
                            );
                            return fetchPlaylistDetails({
                                id: item.id.playlistId,
                            });
                        }
                    } catch (error) {
                        console.error(
                            `videoViewCountPromises / Error fetching videoDetails ${item.id}: `,
                            error
                        );
                        return { items: { viewCount: "0" } };
                    }
                }
            );

            const videoViewCount = await Promise.all(videoViewCountPromises);

            processedVideoViewCount = videoItems.map((item, idx) => {
                const viewCount =
                    videoViewCount[idx]?.items?.[0].statistics?.viewCount ??
                    "0";

                // Video, PlayList 타입을 IEnrichedVideo로 변환
                return {
                    ...item,
                    viewCount: parseInt(viewCount),
                    //  id 속성 보정
                    id:
                        "videoId" in item.id
                            ? item.id
                            : {
                                  kind: "youtube#video",
                                  videoId: `${item.id.playlistId}`,
                              },
                } as IEnrichedVideo;
            });
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
