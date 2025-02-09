"use client";

import { Video } from "../utils/type";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import VideoItem from "./video-item";

export const VideoSwiper = ({ video }: { video: any }) => {
    console.log(video);

    return (
        <Swiper
            spaceBetween={24}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation, Pagination]}
            direction="horizontal"
        >
            {video.items.map((video: Video, index: number) => (
                <SwiperSlide key={index}>
                    <VideoItem video={video} key={video.id.videoId} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
