import Link from "next/link";
import style from "./page.module.css";
import { Suspense } from "react";
import { fetchYoutubeVideos } from "../api";

type Props = {
    searchParams: Promise<{ q: string }>;
};

type SearchParams = {
    q: string;
    nextPageToken: any;
    maxResult: number;
};

async function SearchResult({ q }: { q: string }) {
    console.log(q);
    const res = await fetchYoutubeVideos(q);

    console.log(res);
    return <div></div>;
    // const videos = res;
    // console.log(videos);

    // return videos.map((video: any) => <div key={video.id} {...video}></div>);
}

export default async function Search({ searchParams }: Props) {
    const { q } = await searchParams;

    return (
        <div className={style.video}>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchResult q={q || ""} />
            </Suspense>
            <Content />
            <Content />
        </div>
    );
}

export function Content() {
    return (
        <div className={style.container}>
            <div className={style.thumbnail__img}>
                <Link href={`/video/`}>
                    <img
                        alt=""
                        src="https://i.ytimg.com/vi/LY3lQ-sOT1E/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLCb1M9B23bf3wldGnnWBN1r04y2nw"
                    />
                </Link>
            </div>

            <div className={style.info__content}>
                <img src="https://yt3.ggpht.com/XfS8CIrSHyofq79j-qoHukdwloL6H2UkKl36OMBeyHVdPBEr-6HzVLuASMsKl32HFfvYaekgFA=s68-c-k-c0x00ffffff-no-rj" />
                <div>
                    <h3 className={style.content__title}>
                        와... 이건 진짜 영화다
                    </h3>
                    <span className={style.content__author}>우주하마</span>
                    <span className={style.content__info}>
                        조회수 13만회 / 2일 전
                    </span>
                </div>
            </div>
        </div>
    );
}
