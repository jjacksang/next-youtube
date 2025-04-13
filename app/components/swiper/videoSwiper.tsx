"use client";

import style from "./videoSwiper.module.css";

import { IChannel, IEnrichedVideo, Video } from "../../utils/type";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import VideoItem from "../video-item";

interface IVideoSwiperProps {
    videos: (IEnrichedVideo | IChannel)[];
}

export const VideoSwiper = ({ videos }: IVideoSwiperProps) => {
    console.log("videoSwiper", videos);

    // channel, video데이터 구분 후 video데이터만 추출
    const isEnrichedVideo = (
        item: IEnrichedVideo | IChannel
    ): item is IEnrichedVideo => {
        return "videoId" in item.id && "viewCount" in item;
    };

    const videoItems = videos.filter(isEnrichedVideo);

    return (
        <div className={style.swiper__container}>
            <Swiper
                spaceBetween={24}
                slidesPerView={4}
                navigation={true}
                className={style.swiper}
                modules={[Navigation, Pagination]}
                direction="horizontal"
            >
                {videoItems.map((video) => (
                    <SwiperSlide
                        className={style.swiper__slide}
                        key={video.id.videoId}
                    >
                        <VideoItem video={video} key={video.id.videoId} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
