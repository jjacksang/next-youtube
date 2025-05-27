"use client";

import style from "./video-list-client.module.css";

import { IChannel, IEnrichedVideo } from "../utils/type";
import VideoItem from "../components/video-item";
import { RecoChannel } from "../components/reco-channel";
import useSearchInfinietQuery, {
    InitialYoutubeData,
} from "../hooks/useSearchInfiniteQuery";

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
    const initialData: InitialYoutubeData = {
        items: initialVideos,
        nextPageToken: nextPageToken,
    };

    const {
        status,
        allVideos,
        allChannels,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useSearchInfinietQuery(initialQuery, initialData);
    console.log("REACT QUERY ACTIVE : ", { ...allChannels, ...allVideos });

    return (
        <>
            {allChannels && allChannels.length > 0 ? (
                <RecoChannel channel={allChannels[0]} />
            ) : (
                <></>
            )}
            <div className={style.video} key="video-list">
                {allVideos.map((item) => (
                    <VideoItem key={item.id.videoId} video={item} />
                ))}
            </div>
            <div className={style.moreBtn}>
                {hasNextPage === false && isFetchingNextPage === false ? (
                    <button>검색 결과가 없습니다</button>
                ) : (
                    <button onClick={() => fetchNextPage()}>더보기</button>
                )}
            </div>
        </>
    );
};
