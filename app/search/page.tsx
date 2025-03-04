import { fetchVideoDetail, fetchYoutubeVideos } from "../utils/api";
import { processVideoData } from "../utils/process-video-data";
import { VideoListClient } from "./video-list-client";

type Props = {
    searchParams: Promise<{ q: string }>;
};

async function SearchResult({ q }: { q: string }) {
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

        return (
            <>
                <VideoListClient
                    initialQuery={q}
                    initialVideos={addNewVideoData}
                    nextPageToken={searchResults.nextPageToken || ""}
                />
            </>
        );
    } catch (error) {
        console.log("Video Fetching Error", error);
        return <div>fetching Error</div>;
    }
}

export default async function Search({ searchParams }: Props) {
    const { q } = await searchParams;

    return (
        <section>
            <SearchResult q={q || ""} />
        </section>
    );
}
