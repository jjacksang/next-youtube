import { VideoDetail } from "@/app/components/videoDetail";
import style from "./page.module.css";
import { fetchChannelDetails, fetchVideoDetails } from "@/app/utils/api";
import { CommentProvider } from "@/app/provider/comment_provider";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const videoDetails = await fetchVideoDetails({ id });
    console.log(videoDetails);

    const channelDetails = await fetchChannelDetails({
        id: videoDetails.items[0].snippet.channelId,
    });

    const channelThumbnail =
        channelDetails.items[0].snippet.thumbnails.default.url;

    return (
        <div>
            <VideoDetail
                videoDetail={videoDetails}
                channelThumbnail={channelThumbnail}
            />
            <div className={style.comment__container}>
                <div className={style.comment__form}>
                    <h3>{`댓글 ${videoDetails.items[0].statistics.commentCount} 개`}</h3>
                </div>
                <div>
                    <CommentProvider id={id} />
                </div>
            </div>
        </div>
    );
}
