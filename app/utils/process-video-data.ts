import { fetchVideoDetails } from "./api";
import { IEnrichedVideo, IVideoDetail, Video } from "./type";

interface YoutubeResponse {
    items: Video[];
    nextPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}

interface VideoDetailResponse {
    items: IVideoDetail[];
}

export async function processVideoData(searchResults: YoutubeResponse) {
    // searchResults에 대한 상세정보를 통해 viewCount를 받아와
    // VideoItem컴포넌트에 전달
    console.log(searchResults);

    const videoItems = searchResults.items.filter(
        (item: Video) => item.id && item.id.videoId
    );

    console.log("video Items", videoItems);

    const videoViewCount: VideoDetailResponse[] = await Promise.all(
        videoItems.map((item: Video) =>
            fetchVideoDetails({ id: item.id.videoId })
        )
    );

    console.log("videoViewCount", videoViewCount);

    // video view count 추가하여 새로운 데이터 반환
    const videoWithViewCount: IEnrichedVideo[] = videoItems.map(
        (item: Video, index: number) => ({
            ...item,
            viewCount: parseInt(
                videoViewCount[index].items[0].statistics?.viewCount ?? "0"
            ),
        })
    );

    console.log("viewoWhiteViewCount", videoWithViewCount);

    return {
        videoWithViewCount,
        nextPageToken: searchResults.nextPageToken || "",
    };
}
