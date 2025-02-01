import { VideoSwiper } from "@/app/components/swiper/VideoSwiper";
import style from "./page.module.css";

import VideoItem from "@/app/components/video-item";
import { fetchChannelVideos } from "@/app/utils/api";
import { Video } from "@/app/utils/type";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <div className={style.video__wrapper}>
            <div className={style.reco__video}>
                <h2>추천 영상</h2>
                <RecoVideo params={params} />
            </div>
        </div>
    );
}

const RecoVideo = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const channelVideo = await fetchChannelVideos(id);
    console.log(channelVideo);

    return (
        <>
            {channelVideo.length === 0 ? (
                <div>none</div>
            ) : (
                <>
                    <VideoSwiper>
                        {channelVideo.items.map((video: Video) => (
                            <VideoItem video={video} key={video.id.videoId} />
                        ))}
                    </VideoSwiper>
                </>
            )}
        </>
    );
};
