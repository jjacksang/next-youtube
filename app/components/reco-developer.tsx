import { IChannel, IEnrichedVideo } from "../utils/type";
import { VideoSwiper } from "./swiper/videoSwiper";

export async function RecoDeveloper({
    channelVideos,
}: {
    channelVideos: (IEnrichedVideo | IChannel)[];
}) {
    console.log(channelVideos);
    return (
        <div>
            <div>
                <VideoSwiper videos={channelVideos} />
            </div>
        </div>
    );
}
