"use client";

import style from "./video-list-client.module.css";

import { Video } from "../utils/type";
import { fetchYoutubeVideos } from "../utils/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import VideoItem from "../components/video-item";

export const VideoListClient = ({
    initialQuery,
    initialVideos,
    nextPageToken,
}: {
    initialQuery: string;
    initialVideos: Video[];
    nextPageToken: string;
}) => {
    const [videos, setVideos] = useState<Video[]>(initialVideos);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageToken, setPageToken] = useState<string>(nextPageToken);
    console.log(initialVideos);
    console.log(nextPageToken);

    const searchParams = useSearchParams();
    const currentQuery = searchParams.get("q") || "";

    // 더보기 버튼
    const handleLoadMore = async () => {
        console.log(pageToken);

        const response = await fetchYoutubeVideos({
            q: initialQuery,
            maxResults: 24,
            nextPageToken: pageToken,
        });

        console.log("response nextPageToken", response);

        // 해당 데이터를 검열 후 반환
        setVideos((prev) => [...prev, ...response.items]);
        setPageToken(response.nextPageToken);
    };

    useEffect(() => {
        console.log("Update pageToken", pageToken);
    }, [pageToken]);

    return (
        <>
            <div className={style.video}>
                {videos.map((item) => (
                    <VideoItem key={item.id.videoId} video={item} />
                ))}
            </div>
            <div className={style.moreBtn}>
                {isLoading ? (
                    "로딩 중"
                ) : (
                    <button onClick={handleLoadMore}>더보기</button>
                )}
            </div>
        </>
    );
};
