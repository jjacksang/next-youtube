import Link from "next/link";
import style from "./page.module.css";
import { Suspense } from "react";
import { fetchYoutubeVideos } from "../utils/api";
import Image from "next/image";
import { Video } from "../utils/type";

type Props = {
    searchParams: Promise<{ q: string }>;
};

interface IVideo {
    video: Video;
}

async function SearchResult({ q }: { q: string }) {
    console.log(q);
    const res = await fetchYoutubeVideos(q);

    console.log(res);

    return res.items.map((video: Video) => (
        <Content video={video} key={video.id.videoId} />
    ));
}

export default async function Search({ searchParams }: Props) {
    const { q } = await searchParams;

    return (
        <div className={style.video}>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchResult q={q || ""} />
            </Suspense>
        </div>
    );
}

export function Content({ video }: IVideo) {
    return (
        <div className={style.container}>
            <div className={style.thumbnail__img}>
                <Link href={`/video/${video.id.videoId}`}>
                    <Image
                        alt="h"
                        width={68}
                        height={68}
                        src={video.snippet.thumbnails.default.url}
                    />
                </Link>
            </div>

            <div className={style.info__content}>
                <div>
                    <h3 className={style.content__title}>
                        {video.snippet.title}
                    </h3>
                    <span className={style.content__author}>
                        {video.snippet.channelTitle}
                    </span>
                    <span className={style.content__info}>
                        {video.snippet.publishedTime}
                    </span>
                </div>
            </div>
        </div>
    );
}
