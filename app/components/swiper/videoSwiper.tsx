"use client";

import style from "./videoSwiper.module.css";

import { Video } from "../../utils/type";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import VideoItem from "../video-item";

export const VideoSwiper = ({ video }: { video: any }) => {
    console.log(video);

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
                {video.items.map((video: Video, index: number) => (
                    <SwiperSlide className={style.swiper__slide} key={index}>
                        <VideoItem video={video} key={video.id.videoId} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
