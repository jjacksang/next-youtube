import { VideoDetail } from "@/app/components/videoDetail";
import { fetchVideoDetail, fetchChannelDetail } from "@/app/utils/api";

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
    console.log(videoDetail);

    const channelThumbnail =
        channelDetail.items[0].snippet.thumbnails.default.url;

    return (
        <div>
            <VideoDetail
                videoDetail={videoDetail}
                channelThumbnail={channelThumbnail}
            />
        </div>
    );
}
