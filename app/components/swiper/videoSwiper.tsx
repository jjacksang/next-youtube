'use client';

import style from './videoSwiper.module.css';

import { IChannel, IEnrichedPlaylist, IEnrichedVideo } from '../../utils/type';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';

import VideoItem from '../video-item';

interface IVideoSwiperProps {
  videos: (IEnrichedVideo | IEnrichedPlaylist | IChannel)[];
}

export const VideoSwiper = ({ videos }: IVideoSwiperProps) => {
  console.log('videoSwiper', videos);

  // channel, video데이터 구분 후 video데이터만 추출
  const isEnrichedData = (
    item: IEnrichedVideo | IEnrichedPlaylist | IChannel,
  ): item is IEnrichedVideo | IEnrichedPlaylist => {
    return (
      item.id.kind === 'youtube#video' || item.id.kind === 'youtube#playlist'
    );
  };

  const videoItems = videos.filter(isEnrichedData);

  const getKey = (video: IEnrichedVideo | IEnrichedPlaylist) => {
    if (video.id.kind === 'youtube#video') {
      return video.id.videoId;
    } else if (video.id.kind === 'youtube#playlist') {
      return video.id.playlistId;
    }
  };

  return (
    <div className={style.swiper__container}>
      <Swiper
        spaceBetween={24}
        slidesPerView={4}
        breakpoints={{
          // 1024px 미만
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1400: { slidesPerView: 4 },
        }}
        navigation={true}
        className={style.swiper}
        modules={[Navigation, Pagination]}
        direction="horizontal"
      >
        {videoItems.map(video => (
          <SwiperSlide className={style.swiper__slide} key={getKey(video)}>
            <VideoItem video={video} key={getKey(video)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
