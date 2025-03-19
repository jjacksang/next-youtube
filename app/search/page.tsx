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
        // const searchResults = await fetchYoutubeVideos({ q, maxResults: 24 });

        console.log(searchResults);

        // searchResults의 데이터를

        return (
            <>
                <VideoListClient initialQuery={q} />
            </>
        );
    } catch (error) {
        console.log("Video Fetching Error", error);
        return <div>fetching Error</div>;
    }
}
