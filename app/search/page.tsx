import { fetchVideoDetails, fetchYoutubeVideos } from "../utils/api";
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
        const data = await fetchYoutubeVideos(
            { q: q, maxResults: 24 },
            {
                cache: "no-store",
            }
        );
        console.log("Page >> ", data);

        // const videoViewCount = await Promise.all(data.items.map((item: Video) => fetchVideoDetails(item.id.videoId)))

        return (
            <>
                <VideoListClient
                    initialQuery={q}
                    initialVideos={data.items}
                    nextPageToken={data.nextPageToken}
                />
            </>
        );
    } catch (error) {
        console.log("Video Fetching Error", error);
        return <div>fetching Error</div>;
    }
}
