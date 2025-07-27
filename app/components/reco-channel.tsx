import Image from 'next/image';
import { IChannel } from '../utils/type';
import style from './reco-channel.module.css';
import Link from 'next/link';

interface RecoChannelProps {
  channel: IChannel;
}

export const RecoChannel = ({ channel }: RecoChannelProps) => {
  console.log('reco-channel >>> ', channel);
  return (
    <div className={style.channel__container}>
      <div className={style.channel__thumbnail}>
        <Link href={`/channel/${channel.id.channelId}`}>
          <Image
            src={channel.snippet.thumbnails.default.url}
            alt={channel.snippet.description}
            width={120}
            height={120}
            className={style.channel__img}
          />
        </Link>
      </div>
      <div className={style.channel__info}>
        <div className={style.channel__text}>
          <h2>{channel.snippet.channelTitle}</h2>
          <span></span>
          <span className={style.channel_description}>
            {channel.snippet.description}
          </span>
        </div>
        <div className={style.subscribe__button}>
          <button type="button">구독</button>
        </div>
      </div>
    </div>
  );
};
