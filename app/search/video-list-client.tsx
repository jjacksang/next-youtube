"use client";

import style from "./video-list-client.module.css";

import { IChannel, IEnrichedVideo } from "../utils/type";
import { fetchYoutubeVideos } from "../utils/api";
import { useEffect, useState } from "react";
import VideoItem from "../components/video-item";
import { RecoChannel } from "../components/reco-channel";

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
    console.log("initialVideos >> ", initialVideos);

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
    console.log("video-list-client", videos);

    // search/page.tsx에서 내려주는 데이터가 변경 시 props로 내려주는
    // initialVideos에 값은 변경되지만 videos에 저장된 값이 다름으로
    // 새로운 query를 내려받았을 때 videos값을 변경
    useEffect(() => {
        if (initialQuery !== currentQuery) {
            setVideos(
                initialVideos.filter(
                    (item): item is IEnrichedVideo =>
                        item.id.kind !== "youtube#channel"
                )
            );
            setCurrentQuery(initialQuery);
            setPageToken(nextPageToken);
            setChannel(
                initialVideos.filter(
                    (item): item is IChannel =>
                        item.id.kind === "youtube#channel"
                )
            );
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
        if (response.nextPageToken) {
            setPageToken(response.nextPageToken);
        } else {
            setPageToken("");
        }
        setIsLoading(false);
    };

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
                    <button onClick={handleLoadMore}>더보기</button>
                )}
            </div>
        </>
    );
};
