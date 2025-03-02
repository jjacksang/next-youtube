"use client";

import style from "./video-list-client.module.css";

import { IEnrichedVideo } from "../utils/type";
import VideoItem from "../components/video-item";
import { fetchYoutubeVideos } from "../utils/api";
import { useState } from "react";
import { processVideoData } from "../utils/process-video-data";

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
    const [pageToken, setPageToken] = useState<string>(nextPageToken);
    console.log(videos);

    // 더보기 버튼
    const handleLoadMore = async () => {
        const response = await fetchYoutubeVideos({
            q: initialQuery,
            maxResults: 24,
            nextPageToken: pageToken,
        });

        // 해당 데이터를 검열 후 반환
        const nextProcessVideos = await processVideoData(response);

        // nextPageToken을 가지고 다음 데이터와 pageToken 저장
        setVideos((prev) => [...prev, ...nextProcessVideos.addNewVideoData]);
        setPageToken(nextProcessVideos.nextPageToken);

        console.log(nextProcessVideos);

        console.log(response);
    };

    return (
        <>
            <div className={style.video}>
                {videos.map((item: IEnrichedVideo) => (
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
