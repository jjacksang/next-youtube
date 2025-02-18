"use client";

import style from "./videoDetail.module.css";

import Link from "next/link";
import { CiRead } from "react-icons/ci";
import { IVideoDetail } from "../utils/type";
import dynamic from "next/dynamic";
import Image from "next/image";
import { elapsedTime } from "../utils/elapsedTime";
import { formatNumber } from "../utils/formatNumber";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const convertUrls = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            return (
                <Link
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {part}
                </Link>
            );
        }
        return <span key={index}>{part}</span>;
    });
};

export const VideoDetail = ({
    videoDetail,
    channelThumbnail,
}: {
    videoDetail: IVideoDetail;
    channelThumbnail: string;
}) => {
    return (
        <section className={style.videoViewPage}>
            {videoDetail && (
                <div className={style.video__view}>
                    <div className={style.video__play}>
                        <ReactPlayer
                            playing={true}
                            url={`https://www.youtube.com/watch?v=${videoDetail.id}`}
                            width="100%"
                            height="100%"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                        />
                    </div>
                    <div className={style.video__info}>
                        <h2 className={style.video__title}>
                            {videoDetail.snippet.title}
                        </h2>
                        <div className={style.video__channel}>
                            <div className={style.id}>
                                <Link
                                    href={`/channel/${videoDetail.snippet.channelId}`}
                                >
                                    <Image
                                        src={channelThumbnail}
                                        alt={videoDetail.snippet.channelTitle}
                                        width={40}
                                        height={40}
                                    />
                                    {videoDetail.snippet.channelTitle}
                                </Link>
                            </div>
                        </div>
                        <div className={style.video__desc}>
                            <div className={style.count}>
                                <span className={style.view}>
                                    <CiRead />
                                    <span>{`${formatNumber(videoDetail.statistics.viewCount)}회`}</span>
                                    <div className={style.dot}>•</div>
                                    <span>{`${elapsedTime(videoDetail.snippet.publishedAt)}`}</span>
                                </span>
                            </div>
                            <div className={style.description}>
                                {convertUrls(videoDetail.snippet.description)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
