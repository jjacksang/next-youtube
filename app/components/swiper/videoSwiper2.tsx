'use client';

import style from './videoSwiper.module.css';

import { IChannel, IEnrichedPlaylist, IEnrichedVideo } from '../../utils/type';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';

import VideoItem from '../video/video-item';
import VideoItem2, { Video } from '../video/video-item2';

interface IVideoSwiperProps {
  videos: Video[];
}

export const VideoSwiper2 = ({ videos }: IVideoSwiperProps) => {
  console.log('videoSwiper', videos);

  // channel, video데이터 구분 후 video데이터만 추출

  return (
    <div className={style.swiper__container}>
      <Swiper
        spaceBetween={24}
        slidesPerView={4}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1400: { slidesPerView: 4 },
        }}
        navigation={true}
        className={style.swiper}
        modules={[Navigation, Pagination]}
        direction="horizontal"
      >
        {videos.map(video => (
          <SwiperSlide className={style.swiper__slide} key={video.id}>
            <VideoItem2 video={video} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
