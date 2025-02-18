import style from "./page.module.css";
import { Suspense } from "react";
import { fetchVideoDetail, fetchYoutubeVideos } from "../utils/api";
import { IVideoDetail, Video } from "../utils/type";
import VideoItem from "../components/video-item";

type Props = {
    searchParams: Promise<{ q: string }>;
};

interface IEnrichedVideo extends Video {
    viewCount: number;
}

async function SearchResult({ q }: { q: string }) {
    try {
        const searchResults = await fetchYoutubeVideos({ q, maxResults: 24 });

        if (!searchResults || searchResults.length !== 24) {
            return <div>검색 결과를 찾을 수 없습니다.</div>;
        }

        console.log(searchResults);

        const videoViewCount: IVideoDetail[] = await Promise.all(
            searchResults.map((item: Video) =>
                fetchVideoDetail(item.id.videoId)
            )
        );

        console.log(videoViewCount);

        const addNewVideoData: IEnrichedVideo[] = searchResults.map(
            (item: Video, index: number) => ({
                ...item,
                viewCount: parseInt(
                    videoViewCount[index].statistics.viewCount ?? "0"
                ),
            })
        );

        return (
            <>
                {addNewVideoData.map((item: IEnrichedVideo) => (
                    <VideoItem
                        key={item.id.videoId}
                        video={item}
                        viewCount={item.viewCount}
                    />
                ))}
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
            <div className={style.video}>
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchResult q={q || ""} />
                </Suspense>
            </div>
            <div className={style.moreBtn}>
                <button>더보기</button>
            </div>
        </section>
    );
}
