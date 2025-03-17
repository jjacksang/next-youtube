import { fetchYoutubeVideos } from "../utils/api";
import { processVideoData } from "../utils/process-video-data";
import { VideoListClient } from "./video-list-client";

export default async function Search({
    searchParams,
}: {
    searchParams: { q: string };
}) {
    const q = searchParams.q || "";
    console.log("Search Page : ", q);

    try {
        const searchResults = await fetchYoutubeVideos({ q, maxResults: 24 });

        if (!searchResults || searchResults.items.length !== 24) {
            return <div>검색 결과를 찾을 수 없습니다.</div>;
        }

        console.log(searchResults);

        // searchResults의 데이터를
        const { addNewVideoData, nextPageToken } =
            await processVideoData(searchResults);

        console.log(addNewVideoData);
        console.log(nextPageToken);

        return (
            <>
                <VideoListClient
                    initialQuery={q}
                    initialVideos={addNewVideoData}
                    nextPageToken={nextPageToken || ""}
                />
            </>
        );
    } catch (error) {
        console.log("Video Fetching Error", error);
        return <div>fetching Error</div>;
    }
}
