"use client";

import style from "./video-list-client.module.css";

import { IChannel, IEnrichedVideo } from "../utils/type";
import { fetchYoutubeVideos } from "../utils/api";
import { useCallback, useEffect, useRef, useState } from "react";
import VideoItem from "../components/video-item";
import { RecoChannel } from "../components/reco-channel";
import useSearchInfinietQuery from "../hooks/useSearchInfiniteQuery";

type YoutubeItems = (IEnrichedVideo | IChannel)[];

export const VideoListClient = ({
    initialQuery,
    initialVideos,
    nextPageToken,
}: {
    initialQuery: string;
    initialVideos: YoutubeItems;
    nextPageToken: string;
}) => {
    const [currentQuery, setCurrentQuery] = useState(initialQuery);
    // response에 첫 요청의 경우 channel의 정보를 같이 주는 경우가 있어 검열
    const [videos, setVideos] = useState<IEnrichedVideo[]>(
        initialVideos.filter(
            (item): item is IEnrichedVideo => item.id.kind !== "youtube#channel"
        )
    );
    // 해당 채널에 대한 데이터를 저장
    const [channel, setChannel] = useState<IChannel[]>(
        initialVideos.filter(
            (item): item is IChannel => item.id.kind === "youtube#channel"
        )
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageToken, setPageToken] = useState<string>(nextPageToken);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useSearchInfinietQuery(initialQuery, initialVideos, nextPageToken);

    console.log("REACT QUERY ACTIVE : ", data);

    useEffect(() => {
        console.log("Update pageToken", pageToken);
    }, [pageToken]);

    return (
        <>
            {channel && channel.length > 0 ? (
                <RecoChannel channel={channel[0]} />
            ) : (
                <></>
            )}
            <div className={style.video} key="video-list">
                {videos.map((item) => (
                    <VideoItem key={item.id.videoId} video={item} />
                ))}
            </div>
            <div className={style.moreBtn}>
                {isLoading === false && pageToken === "" ? (
                    <button>검색 결과가 없습니다</button>
                ) : (
                    <button>더보기</button>
                )}
            </div>
        </>
    );
};
