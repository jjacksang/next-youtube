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
        const data = await fetchYoutubeVideos({ q: q, maxResults: 25 });

        // data에 처음 조회요청에 0번 인덱스는 채널 정보임으로 이후 데이터만 가공
        const videoItems = data.items.slice(1, 25);

        return (
            <>
                <VideoListClient
                    initialQuery={q}
                    initialVideos={videoItems}
                    nextPageToken={data.nextPageToken}
                />
            </>
        );
    } catch (error) {
        console.log("Video Fetching Error", error);
        return <div>fetching Error</div>;
    }
}
