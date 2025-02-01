"use client";

import style from "./videoSwiper.module.css";

import { ReactNode } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

SwiperCore.use([Pagination]);

export const VideoSwiper = ({ children }: { children: ReactNode }) => {
    return (
        <div className={style.swiper__container}>
            <Swiper
                spaceBetween={24}
                slidesPerView={4}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                direction="horizontal"
                className={style.swiper__wrapper}
            >
                <SwiperSlide className={style.swiper__slide}>
                    {children}
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
