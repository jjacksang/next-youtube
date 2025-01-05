"use client";

import style from "./videoDetail.module.css";

import Link from "next/link";
import { CiRead } from "react-icons/ci";
import { IVideoDetail } from "../utils/type";
import dynamic from "next/dynamic";
import Image from "next/image";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export const VideoDetail = ({ videoDetail }: { videoDetail: IVideoDetail }) => {
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
                            {videoDetail.title}
                        </h2>
                        <div className={style.video__channel}>
                            <div className={style.id}>
                                <Link
                                    href={`/channel/${videoDetail.channelId}`}
                                >
                                    <Image
                                        src={videoDetail.thumbnail[0].url}
                                        alt={videoDetail.channelTitle}
                                        width={40}
                                        height={40}
                                    />
                                    {videoDetail.channelTitle}
                                </Link>
                            </div>
                            <div className={style.count}>
                                <span className={style.view}>
                                    <CiRead />
                                    {videoDetail.viewCount}
                                </span>
                            </div>
                        </div>
                        <div className={style.video__desc}>
                            {videoDetail.description}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
