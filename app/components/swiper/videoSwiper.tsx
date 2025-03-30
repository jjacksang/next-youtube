"use client";

import style from "./videoSwiper.module.css";

import { IEnrichedVideo, Video } from "../../utils/type";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import VideoItem from "../video-item";

interface IVideoSwiperProps {
    videos: {
        addNewVideoData: IEnrichedVideo[];
        nextPageToken?: string;
    };
}

export const VideoSwiper = ({ videos }: IVideoSwiperProps) => {
    console.log(videos);

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
                {videos.addNewVideoData.map((video: IEnrichedVideo) => (
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
