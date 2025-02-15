import style from "./page.module.css";
import { Suspense } from "react";
import { fetchVideoDetail, fetchYoutubeVideos } from "../utils/api";
import { Video } from "../utils/type";
import VideoItem from "../components/video-item";

type Props = {
    searchParams: Promise<{ q: string }>;
};

interface IEnrichedVideo extends Video {
    viewCount: number;
}

async function SearchResult({ q }: { q: string }) {
    const searchResults = await fetchYoutubeVideos(q);

    const videoViewCount = await Promise.all(
        searchResults.items.map((item: Video) =>
            fetchVideoDetail(item.id.videoId)
        )
    );

    console.log(videoViewCount);
    const addNewVideoData: IEnrichedVideo[] = searchResults.items.map(
        (item: Video, index: number) => ({
            ...item,
            viewCount: videoViewCount[index].statistics.viewCount,
        })
    );

    console.log(videoViewCount);

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
