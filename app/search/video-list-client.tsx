"use client";

import style from "./page.module.css";

import { IEnrichedVideo, Video } from "../utils/type";
import VideoItem from "../components/video-item";

interface IVideoListProps {
    initialQuery: string;
    initialVideos: IEnrichedVideo[];
    nextPageToken: string;
}

export const VideoListClient = ({
    initialQuery,
    initialVideos,
    nextPageToken,
}: IVideoListProps) => {
    return (
        <>
            <div className={style.video}>
                {initialVideos.map((item: IEnrichedVideo) => (
                    <VideoItem
                        key={item.id.videoId}
                        video={item}
                        viewCount={item.viewCount}
                    />
                ))}
            </div>
            <div className={style.moreBtn}>
                <button>더보기</button>
            </div>
        </>
    );
};
