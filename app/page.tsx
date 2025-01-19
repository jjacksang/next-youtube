import styles from "./page.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { fetchYoutubeVideos } from "./utils/api";
import { Suspense } from "react";

async function DeverloperVideo() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAPID_API_URL as string}/search?q=코딩애플&part=snippet`,
        {
            headers: {
                "X-RapidAPI-Key": process.env
                    .NEXT_PUBLIC_RAPID_API_KEY as string,
                "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
            },
        }
    );
    if (!res.ok) {
        console.log("error!!");
        return <div>Response Error!!</div>;
    }

    console.log(await res.json());

    return (
        <>
            <div className={styles.youtuber}>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/tEHzde-2oKTr_PITRkIu8rdBs_0dUiOpWcPjZ-Taa9adri1lejaide2vjnDAhfH4jUn6EP4g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>이정환 | Winterlood</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/tEHzde-2oKTr_PITRkIu8rdBs_0dUiOpWcPjZ-Taa9adri1lejaide2vjnDAhfH4jUn6EP4g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>이정환 | Winterlood</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/tEHzde-2oKTr_PITRkIu8rdBs_0dUiOpWcPjZ-Taa9adri1lejaide2vjnDAhfH4jUn6EP4g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>이정환 | Winterlood</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/tEHzde-2oKTr_PITRkIu8rdBs_0dUiOpWcPjZ-Taa9adri1lejaide2vjnDAhfH4jUn6EP4g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>이정환 | Winterlood</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/tEHzde-2oKTr_PITRkIu8rdBs_0dUiOpWcPjZ-Taa9adri1lejaide2vjnDAhfH4jUn6EP4g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>이정환 | Winterlood</span>
                </div>
            </div>
        </>
    );
}

export default function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.swiper__section}>
                <section>
                    <h2>제작에 참고한 유튜버</h2>
                    {/* <Swiper
                        modules={[Autoplay, Pagination]}
                        slidesPerView={4}
                        spaceBetween={15}
                        navigation={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                    >
                        <SwiperSlide></SwiperSlide>
                    </Swiper> */}
                    <Suspense fallback={<div>Loading...</div>}>
                        <DeverloperVideo />
                    </Suspense>
                </section>
            </div>
            <div className={styles.video__list}>
                <section>
                    <h2>Next.js 유튜브 영상</h2>
                </section>
            </div>
        </div>
    );
}
