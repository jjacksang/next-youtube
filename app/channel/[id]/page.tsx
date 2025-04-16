import { fetchChannelDetails } from "@/app/utils/api";
import style from "./page.module.css";

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

    const channelData = await fetchChannelDetails({ id });

    const fetchChannelVideos = await fetch(
        `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/search?part=snippet&channelId=${id}&order=date&maxResults=12&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    ).then((res) => {
        if (!res.ok) {
            throw new Error(`failed fetch channel videos : ${res.status}`);
        } else {
            return res.json();
        }
    });

    const recoVideosWithViewCount = await processVideoData(fetchChannelVideos);

    console.log("reco origin data", fetchChannelVideos);
    console.log("reco process data", recoVideosWithViewCount);

    return (
        <>
            {recoVideosWithViewCount === null ? (
                <div>none</div>
            ) : (
                <>
                    <VideoSwiper
                        videos={recoVideosWithViewCount.videoWithViewCount}
                    />
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

    const fetchChannelVideos = await fetch(
        `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/search?part=snippet&channelId=${id}&order=viewCount&maxResults=12&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    ).then((res) => {
        if (!res.ok) {
            throw new Error(`failed fetch channel videos : ${res.status}`);
        } else {
            return res.json();
        }
    });

    const popularVideosWithViewCount =
        await processVideoData(fetchChannelVideos);

    console.log("popular origin data", fetchChannelVideos);
    console.log("popular process data", popularVideosWithViewCount);

    return (
        <>
            {popularVideosWithViewCount === null ? (
                <div>none</div>
            ) : (
                <>
                    <VideoSwiper
                        videos={popularVideosWithViewCount.videoWithViewCount}
                    />
                </>
            )}
        </>
    );
};
