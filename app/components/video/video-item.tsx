import Link from 'next/link';
import style from './video-item.module.css';
import Image from 'next/image';
import { elapsedTime } from '../../utils/elapsedTime';
import { formatNumber } from '../../utils/formatNumber';
import { Video } from './video-item2';

interface VideoItemProps {
  video: Video;
}

//function getVideoOrPlaylistId(
// video: IEnrichedVideo | IEnrichedPlaylist,
// ): string {
// if (video.id.kind === 'youtube#video') return video.id.videoId;
//  if (video.id.kind === 'youtube#playlist') return video.id.playlistId;
// return '';
//}

export default function VideoItem({ video }: VideoItemProps) {
  // const id = getVideoOrPlaylistId(video);
  // const isVideo = video.id.kind === 'youtube#video';
  // const href = isVideo ? `/video/${id}` : `/playlist/${id}`;
  return (
    <div className={style.container} key={video.id}>
      <div className={style.thumbnail__img}>
        <Link href={video.thumbnailUrl}>
          <Image
            alt={video.description}
            priority={true}
            width={68}
            height={68}
            src={video.thumbnailUrl as string}
          />
        </Link>
      </div>
      <div className={style.info__container}>
        <div className={style.channel__img}>
          <Link href={`/channel/${video.channelId}`}>
            <Image
              src={video.channelThumbnailUrl! as string}
              alt={video.description}
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className={style.info__content}>
          <h3 className={style.content__title}>{video.title}</h3>
          <div className={style.content__area}>
            <span className={style.content__author}>{video.channelTitle}</span>

            <div className={style.preview__info}>
              <span>조회수 {formatNumber(video.viewCount)}회</span>
              <div className={style.dot}>•</div>
              <span>{elapsedTime(video.publishTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
