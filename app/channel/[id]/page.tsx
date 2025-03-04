import style from "./page.module.css";

import { fetchChannelVideos } from "@/app/utils/api";
import { VideoSwiper } from "@/app/components/swiper/videoSwiper";

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

    console.log(channelVideo);

    return (
        <>
            {channelVideo.length === 0 ? (
                <div>none</div>
            ) : (
                <>
                    <VideoSwiper video={channelVideo} />
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

    console.log(popularVideos);

    return (
        <>
            {popularVideos.length === 0 ? (
                <div>none</div>
            ) : (
                <>
                    <VideoSwiper video={popularVideos} />
                </>
            )}
        </>
    );
};
