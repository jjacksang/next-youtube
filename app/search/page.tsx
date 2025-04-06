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

        if (searchData?.items?.length > 0) {
            const videoIds = searchData.items
                .map((item: Video) => item.id.videoId)
                .filter((id: string) => !!id)
                .join(",");
            const videoDetails = await fetchVideoDetails(videoIds);
            console.log(videoDetails);
        }

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
        console.log("Video Fetching Error", error);
        return <div>fetching Error</div>;
    }
}
