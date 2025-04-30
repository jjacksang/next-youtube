import { processVideoData } from "../utils/process-video-data";
import { VideoSwiper } from "./swiper/videoSwiper";

export async function RecoDeveloper({ channelId }: { channelId: string }) {
    const searchDevelpoer = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=date&regionCode=KR&channelId=${channelId}&maxResults=12&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    ).then((response) => {
        if (response.ok) return response.json();
    });

    const videoData = await processVideoData(searchDevelpoer);

    console.log(videoData);

    return (
        <div>
            <div>
                <VideoSwiper videos={videoData.videoWithViewCount} />
            </div>
        </div>
    );
}
