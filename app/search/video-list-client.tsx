"use client";

import style from "./video-list-client.module.css";

import { IEnrichedVideo } from "../utils/type";
import VideoItem from "../components/video-item";
import { fetchYoutubeVideos } from "../utils/api";
import { useState } from "react";

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
    const [videos, setVideos] = useState<IEnrichedVideo[]>(initialVideos);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    console.log(videos);

    const handleLoadMore = async () => {
        const response = await fetchYoutubeVideos({
            q: initialQuery,
            maxResults: 24,
            nextPageToken: nextPageToken,
        });

        console.log(response);
    };

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
                <button onClick={handleLoadMore}>더보기</button>
            </div>
        </>
    );
};
