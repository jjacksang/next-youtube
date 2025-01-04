"use client";

import style from "./videoDetail.module.css";

import Link from "next/link";
import { CiChat1, CiRead, CiStar } from "react-icons/ci";
import ReactPlayer from "react-player";
import { IVideoDetail } from "../utils/type";

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
                            style={{ position: "absolute", top: 0, left: 0 }}
                        />
                    </div>
                    <div className="video__info">
                        <h2 className="video__title">{videoDetail.title}</h2>
                        <div className="video__channel">
                            <div className="id">
                                <Link
                                    href={`/channel/${videoDetail.channelId}`}
                                >
                                    {videoDetail.channelTitle}
                                </Link>
                            </div>
                            <div className="count">
                                <span className="view">
                                    <CiRead />
                                    {videoDetail.viewCount}
                                </span>
                            </div>
                        </div>
                        <div className="video__desc">
                            {videoDetail.description}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
