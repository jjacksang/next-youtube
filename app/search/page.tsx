import { fetchYoutubeVideos } from "../utils/api";
import { VideoListClient } from "./video-list-client";

export default async function Search({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const { q } = await searchParams;
    console.log("Search Page : ", q);

    try {
        const data = await fetchYoutubeVideos({ q: q, maxResults: 24 });

        console.log("Page >> ", data);

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
