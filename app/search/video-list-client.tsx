"use client";

import style from "./video-list-client.module.css";

import { IEnrichedVideo } from "../utils/type";
import VideoItem from "../components/video-item";
import { fetchYoutubeVideos } from "../utils/api";
import { useEffect, useState } from "react";
import { processVideoData } from "../utils/process-video-data";
import { useSearchParams } from "next/navigation";

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
    console.log(nextPageToken);

    const searchParams = useSearchParams();
    const currentQuery = searchParams.get("q") || "";

    console.log(initialQuery);
    console.log(currentQuery);

    // 더보기 버튼
    const handleLoadMore = async () => {
        console.log(pageToken);

        const response = await fetchYoutubeVideos({
            q: initialQuery,
            maxResults: 24,
            nextPageToken: pageToken,
        });

        console.log("response nextPageToken", response.nextPageToken);

        const nextProcessVideos = await processVideoData(response);
        // 해당 데이터를 검열 후 반환

        // nextPageToken을 가지고 다음 데이터와 pageToken 저장
        setVideos((prev) => [...prev, ...nextProcessVideos.addNewVideoData]);
        setPageToken(nextProcessVideos.nextPageToken);

        console.log(nextProcessVideos);

        console.log(response);
    };

    useEffect(() => {
        console.log("Update pageToken", pageToken);
    }, [pageToken]);
    // useEffect(() => {
    //     const fetchNewResult = async () => {
    //         if (currentQuery !== initialQuery) {
    //             setIsLoading(true);
    //             console.log("useEffect active!!");
    //             try {
    //                 const newResults = await fetchYoutubeVideos({
    //                     q: currentQuery,
    //                     maxResults: 24,
    //                 });
    //                 if (!newResults || newResults.items.length !== 24) {
    //                     return <div>검색 결과를 찾을 수 없습니다.</div>;
    //                 }

    //                 const { addNewVideoData, nextPageToken } =
    //                     await processVideoData(newResults);
    //                 setVideos(addNewVideoData);
    //             } catch (error) {
    //                 console.log("fetch new results failed", error);
    //             } finally {
    //                 setIsLoading(false);
    //             }
    //         }
    //     };

    //     fetchNewResult();
    // }, [currentQuery, initialQuery]);

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
                {isLoading ? (
                    "로딩 중"
                ) : (
                    <button onClick={handleLoadMore}>더보기</button>
                )}
            </div>
        </>
    );
};
