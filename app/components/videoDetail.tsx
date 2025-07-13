'use client';

import style from './videoDetail.module.css';

import Link from 'next/link';
import { CiRead } from 'react-icons/ci';
import { IVideoDetail } from '../utils/type';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { elapsedTime } from '../utils/elapsedTime';
import type ReactPlayer from 'react-player';
import React, { RefObject } from 'react';

const ReactYoutubePlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

const convertUrls = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <Link key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </Link>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

interface IVideoDetailProps {
  items: IVideoDetail[];
}

export const VideoDetail = ({
  videoDetail,
  channelThumbnail,
  playerRef,
}: {
  videoDetail: IVideoDetailProps;
  channelThumbnail: string;
  playerRef: RefObject<ReactPlayer | null>;
}) => {
  return (
    <section className={style.videoViewPage}>
      {videoDetail && (
        <div className={style.video__view}>
          <div className={style.video__play}>
            <ReactYoutubePlayer
              ref={playerRef}
              playing={true}
              controls
              url={`https://www.youtube.com/watch?v=${videoDetail.items[0].id}`}
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          </div>
          <div className={style.video__info}>
            <h2 className={style.video__title}>
              {videoDetail.items[0].snippet.title}
            </h2>
            <div className={style.video__channel}>
              <div className={style.id}>
                <Link
                  href={`/channel/${videoDetail.items[0].snippet.channelId}`}
                >
                  <Image
                    src={channelThumbnail}
                    alt={videoDetail.items[0].snippet.channelTitle}
                    width={40}
                    height={40}
                  />
                  {videoDetail.items[0].snippet.channelTitle}
                </Link>
              </div>
            </div>
            <div className={style.video__desc}>
              <div className={style.count}>
                <span className={style.view}>
                  <CiRead />
                  <div className={style.dot}>•</div>
                  <span>{`${elapsedTime(videoDetail.items[0].snippet.publishedAt)}`}</span>
                </span>
              </div>
              <div className={style.description}>
                <input
                  type="checkbox"
                  id="descriptionToggle"
                  className={style.description_more_btn}
                />
                <span className={style.description_text}>
                  {convertUrls(videoDetail.items[0].snippet.description)}
                </span>
                <label
                  htmlFor="descriptionToggle"
                  className={style.description_label}
                ></label>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
