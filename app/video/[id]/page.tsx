import { VideoDetail } from "@/app/components/videoDetail";
import { fetchVideoDetail } from "@/app/utils/api";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const videoDetail = await fetchVideoDetail(id);
    console.log(videoDetail);

    return (
        <div>
            <VideoDetail videoDetail={videoDetail} />
        </div>
    );
}
