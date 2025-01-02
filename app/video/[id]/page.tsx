import { fetchVideoDetail } from "@/app/utils/api";

export const VideoDetail = async ({ videoId }: { videoId: string }) => {
    const res = await fetchVideoDetail(videoId);
    console.log(res);

    return <div>Video Detail</div>;
};

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log(id);
    return (
        <div>
            <VideoDetail videoId={id} />
        </div>
    );
}
