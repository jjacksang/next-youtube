import style from "./page.module.css";
import { Suspense } from "react";
import { fetchVideoDetail, fetchYoutubeVideos } from "../utils/api";
import { IVideoDetail, Video } from "../utils/type";
import VideoItem from "../components/video-item";

type Props = {
    searchParams: Promise<{ q: string }>;
};

async function SearchResult({ q }: { q: string }) {
    console.log(q);
    const res = await fetchYoutubeVideos(q);

    console.log(res);
    // const videos = await Promise.all(
    //     res.items.map(async (video: Video) => {
    //         const details = await fetchVideoDetail(video.id.videoId);
    //         return {
    //             video,
    //             viewCount: details.statistics.viewCount,
    //         };
    //     })
    // );
    // console.log(videos);

    // return (
    //     <>
    //         {videos.map((item) => (
    //             <VideoItem key={item.id} video={item} />
    //         ))}
    //     </>
    // );
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
