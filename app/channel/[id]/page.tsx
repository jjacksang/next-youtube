import style from "./page.module.css";

import { fetchChannelVideos } from "@/app/utils/api";
import { VideoSwiper } from "@/app/components/swiper/videoSwiper";
import { processVideoData } from "@/app/utils/process-video-data";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <div className={style.video__wrapper}>
            <h2>추천 영상</h2>
            <div className={style.reco__video}>
                <RecoVideo params={params} />
            </div>
            <h2>인기 영상</h2>
            <div className={style.popularVideos}>
                <PopularVideos params={params} />
            </div>
        </div>
    );
}

const RecoVideo = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const channelVideo = await fetchChannelVideos(id, "date");

    const recoVideosWithViewCount = await processVideoData(channelVideo);

    console.log(recoVideosWithViewCount);

    return (
        <>
            {recoVideosWithViewCount.addNewVideoData.length === 0 ? (
                <div>none</div>
            ) : (
                <>
                    <VideoSwiper videos={recoVideosWithViewCount} />
                </>
            )}
        </>
    );
};

const PopularVideos = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const popularVideos = await fetchChannelVideos(id, "viewCount");

    const popularVideosWithViewCount = await processVideoData(popularVideos);

    console.log(popularVideosWithViewCount);

    return (
        <>
            {popularVideosWithViewCount.addNewVideoData.length === 0 ? (
                <div>none</div>
            ) : (
                <>
                    <VideoSwiper
                        videos={popularVideosWithViewCount}
                    />
                </>
            )}
        </>
    );
};
