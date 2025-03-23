import { IEnrichedVideo, IVideoDetail, Video } from "./type";

interface YoutubeResponse {
    items: Video[];
    nextPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}

// export async function processVideoData(searchResults: YoutubeResponse) {
//     // searchResults에 대한 상세정보를 통해 viewCount를 받아와
//     // VideoItem컴포넌트에 전달
//     const videoViewCount: IVideoDetail[] = await Promise.all(
//         searchResults.items.map((item: Video) =>
//             fetchVideoDetail(item.id.videoId)
//         )
//     );

//     // video view count 추가하여 새로운 데이터 반환
//     const addNewVideoData: IEnrichedVideo[] = searchResults.items.map(
//         (item: Video, index: number) => ({
//             ...item,
//             viewCount: parseInt(
//                 videoViewCount[index].statistics.viewCount ?? "0"
//             ),
//         })
//     );

//     console.log(addNewVideoData);

//     return {
//         addNewVideoData,
//         nextPageToken: searchResults.nextPageToken || "",
//     };
// }
