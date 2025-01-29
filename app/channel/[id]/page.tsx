import VideoItem from "@/app/components/video-item";
import { fetchChannelVideos } from "@/app/utils/api";
import { Video } from "@/app/utils/type";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // const { id } = await params;

    // const channelVideo = await fetchChannelVideos(id);
    // console.log(channelVideo);

    return (
        <div>
            <RecoVideo params={params} />
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
                    {channelVideo.items.map((video: Video) => (
                        <VideoItem video={video} key={video.id.videoId} />
                    ))}
                </>
            )}
        </>
    );
};
