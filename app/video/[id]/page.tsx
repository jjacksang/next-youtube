import { VideoDetail } from "@/app/components/videoDetail";
import {
    fetchVideoDetail,
    fetchChannelDetail,
    fetchVideoCommnetList,
} from "@/app/utils/api";
import style from "./page.module.css";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const videoDetail = await fetchVideoDetail(id);
    const channelDetail = await fetchChannelDetail(
        videoDetail.snippet.channelId
    );

    const videoCommentList = await fetchVideoCommnetList(id);
    console.log(videoCommentList);

    const channelThumbnail =
        channelDetail.items[0].snippet.thumbnails.default.url;

    return (
        <div>
            <VideoDetail
                videoDetail={videoDetail}
                channelThumbnail={channelThumbnail}
            />
            <div className={style.comment__container}>
                <div>
                    {
                        videoCommentList.items[0].snippet.topLevelComment
                            .snippet.textOriginal
                    }
                </div>
            </div>
        </div>
    );
}
