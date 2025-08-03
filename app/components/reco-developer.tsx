import { IEnrichedPlaylist, IEnrichedVideo } from '../utils/type';
import { VideoSwiper } from './swiper/videoSwiper';

interface RecoDeveloperProps {
  channelVideos: (IEnrichedVideo | IEnrichedPlaylist)[];
}

export async function RecoDeveloper({ channelVideos }: RecoDeveloperProps) {
  console.log(channelVideos);
  return (
    <div>
      <div>
        <VideoSwiper videos={channelVideos} />
      </div>
    </div>
  );
}
