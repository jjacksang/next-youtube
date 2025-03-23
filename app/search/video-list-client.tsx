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
    const [currentQuery, setCurrentQuery] = useState(initialQuery);
    const [videos, setVideos] = useState<Video[]>(initialVideos);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageToken, setPageToken] = useState<string>(nextPageToken);
    console.log(initialQuery);
    console.log(initialVideos);
    console.log(nextPageToken);
    console.log("video-list", currentQuery);

    // search/page.tsx에서 내려주는 데이터가 변경 시 props로 내려주는
    // initialVideos에 값은 변경되지만 videos에 저장된 값이 다름으로
    // 새로운 데이터를 내려받았을 때 videos값을 변경
    useEffect(() => {
        if (initialQuery !== currentQuery) {
            setVideos(initialVideos);
            setCurrentQuery(initialQuery);
            setPageToken(nextPageToken);
            console.log("검색어 변경으로 비디오 목록 초기화: ", initialQuery);
        }
    }, [initialQuery, initialVideos, nextPageToken, currentQuery]);

    // 더보기 버튼
    const handleLoadMore = async () => {
        setIsLoading(true);
        console.log(pageToken);

        const response = await fetchYoutubeVideos({
            q: initialQuery,
            maxResults: 24,
            nextPageToken: pageToken,
        });

        console.log("response nextPageToken", response);

        setVideos((prev) => [...prev, ...response.items]);
        setPageToken(response.nextPageToken);
        setIsLoading(false);
    };

    useEffect(() => {
        console.log("Update pageToken", pageToken);
    }, [pageToken]);

    return (
        <>
            <div className={style.video} key="video-item-list">
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
