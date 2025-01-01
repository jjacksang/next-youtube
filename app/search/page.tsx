import Link from "next/link";
import style from "./page.module.css";
import { Suspense } from "react";
import { fetchYoutubeVideos } from "../api";
import Image from "next/image";
import { Video } from "@/type";

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

    const videos = res.data.filter(
        (content: Video) => content.type !== "channel"
    );
    console.log(videos);

    return videos.map((video: Video) => (
        <Content video={video} key={video.videoId} />
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
    console.log(video.channelThumbnail[0].url);
    return (
        <div className={style.container}>
            <div className={style.thumbnail__img}>
                <Link href={`/video/${video.videoId}`}>
                    <Image
                        alt="h"
                        width={68}
                        height={68}
                        src={video.thumbnail[0].url}
                    />
                </Link>
            </div>

            <div className={style.info__content}>
                <Image
                    alt="y"
                    src={`${video.channelThumbnail[0].url}`}
                    width={`${video.channelThumbnail[0].width}`}
                    height={`${video.channelThumbnail[0].height}`}
                />
                <div>
                    <h3 className={style.content__title}>{video.title}</h3>
                    <span className={style.content__author}>
                        {video.channelTitle}
                    </span>
                    <span className={style.content__info}>
                        {video.publishedText} / {video.viewCount}
                    </span>
                </div>
            </div>
        </div>
    );
}
