import { VideoSwiper } from "@/app/components/swiper/VideoSwiper";
import style from "./page.module.css";

import VideoItem from "@/app/components/video-item";
import { fetchChannelVideos } from "@/app/utils/api";
import { Video } from "@/app/utils/type";
import Image from "next/image";
import Link from "next/link";
import { elapsedTime } from "@/app/utils/elapsedTime";

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
                            <div key={video.id.videoId}>
                                <div>
                                    <Link href={`/video/${video.id.videoId}`}>
                                        <Image
                                            src={
                                                video.snippet.thumbnails.medium
                                                    .url
                                            }
                                            alt={video.snippet.description}
                                            width={
                                                video.snippet.thumbnails.medium
                                                    .width
                                            }
                                            height={
                                                video.snippet.thumbnails.medium
                                                    .height
                                            }
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <span>{video.snippet.title}</span>
                                    <div>
                                        <div className={style.content__text}>
                                            <span
                                                className={
                                                    style.content__author
                                                }
                                            >
                                                {video.snippet.channelTitle}
                                            </span>
                                            <span className={style.publishTime}>
                                                <div className={style.dot}>
                                                    •
                                                </div>
                                                {elapsedTime(
                                                    video.snippet.publishTime
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </VideoSwiper>
                </>
            )}
        </>
    );
};
