import Link from 'next/link';
import style from './video-item.module.css';
import Image from 'next/image';
import { elapsedTime } from '../../utils/elapsedTime';
import { IEnrichedPlaylist, IEnrichedVideo } from '../../utils/type';
import { formatNumber } from '../../utils/formatNumber';

export interface Video {
  id: string;
  channelId: string;
  description: string;
  thumbnailUrl: string;
  // channelThumbnailUrl: string;
  title: string;
  channelTitle: string;
  viewCount: number;
  publishTime: string;
}

interface VideoItemProps {
  video: Video;
}

export default function VideoItem2({ video }: VideoItemProps) {
  const {
    id,
    channelId,
    description,
    thumbnailUrl,
    // channelThumbnailUrl,
    title,
    channelTitle,
    viewCount,
    publishTime,
  } = video;

  const href = `/video/${id}`;
  return (
    <div className={style.container} key={id}>
      <div className={style.thumbnail__img}>
        <Link href={href}>
          <Image
            alt={description}
            priority={true}
            width={68}
            height={68}
            src={thumbnailUrl}
          />
        </Link>
      </div>
      <div className={style.info__container}>
        <div className={style.channel__img}>
          {/* <Link href={`/channel/${channelId}`}>
            <Image
              src={channelThumbnailUrl}
              alt={description}
              width={40}
              height={40}
            />
          </Link> */}
        </div>
        <div className={style.info__content}>
          <h3 className={style.content__title}>{title}</h3>
          <div className={style.content__area}>
            <span className={style.content__author}>{channelTitle}</span>

            <div className={style.preview__info}>
              <span>조회수 {formatNumber(viewCount)}회</span>
              <div className={style.dot}>•</div>
              <span>{elapsedTime(publishTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
