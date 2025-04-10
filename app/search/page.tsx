import { fetchVideoDetails, fetchYoutubeVideos } from "../utils/api";
import { processVideoData } from "../utils/process-video-data";
import { Video } from "../utils/type";
import { VideoListClient } from "./video-list-client";

export default async function Search({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const { q } = await searchParams;
    console.log("Search Page : ", q);

    try {
        const searchData = await fetchYoutubeVideos(
            { q: q, maxResults: 24 },
            {
                cache: "no-store",
            }
        );

        console.log(searchData);

        const { videoWithViewCount, nextPageToken } =
            await processVideoData(searchData);
        console.log("Page >> ", videoWithViewCount);

        return (
            <>
                <VideoListClient
                    initialQuery={q}
                    initialVideos={videoWithViewCount}
                    nextPageToken={searchData.nextPageToken}
                />
            </>
        );
    } catch (error) {
        console.error("Video Fetching Error", error);
        if (error instanceof Error) {
            console.error("Error stack:", error.stack);
        }
        return <div>fetching Error</div>;
    }
}
