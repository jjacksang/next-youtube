import styles from "./page.module.css";
import { fetchYoutubeVideos } from "./utils/api";

async function DeverloperVideo() {
    return (
        <>
            <div className={styles.youtuber}>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/tEHzde-2oKTr_PITRkIu8rdBs_0dUiOpWcPjZ-Taa9adri1lejaide2vjnDAhfH4jUn6EP4g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>이정환 | Winterlood</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/0eIqxAMRNI9gnG0HXSBnpFCmV5E5UjsxzZ3HtvG9Q9PD8QxnZRE9QWvuoiDS8HFEgeFd1Hc4=s160-c-k-c0x00ffffff-no-rj" />
                    <span>Dave Gray</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/ytc/AIdro_lbqqh0NSFeq6P1F-6qRycC37MtiGyMjZFVsZ4J-c6C474=s160-c-k-c0x00ffffff-no-rj" />
                    <span>생활코딩</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/ytc/AIdro_lGam0UvO8iBSBx0Aackj6laHETsKi_8uMFfPy9lMmRfA=s160-c-k-c0x00ffffff-no-rj" />
                    <span>webdecoded</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/1-JruRYG7BEWlF0kjrMaJzGMBC9ywqX0dWwDHPHZRDoZ_UwQdiWLN-1L6BKi2IQsuvl4vEYP1g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>잡캐헨리</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/1-JruRYG7BEWlF0kjrMaJzGMBC9ywqX0dWwDHPHZRDoZ_UwQdiWLN-1L6BKi2IQsuvl4vEYP1g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>잡캐헨리</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/1-JruRYG7BEWlF0kjrMaJzGMBC9ywqX0dWwDHPHZRDoZ_UwQdiWLN-1L6BKi2IQsuvl4vEYP1g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>잡캐헨리</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/1-JruRYG7BEWlF0kjrMaJzGMBC9ywqX0dWwDHPHZRDoZ_UwQdiWLN-1L6BKi2IQsuvl4vEYP1g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>잡캐헨리</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/1-JruRYG7BEWlF0kjrMaJzGMBC9ywqX0dWwDHPHZRDoZ_UwQdiWLN-1L6BKi2IQsuvl4vEYP1g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>잡캐헨리</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img src="https://yt3.googleusercontent.com/1-JruRYG7BEWlF0kjrMaJzGMBC9ywqX0dWwDHPHZRDoZ_UwQdiWLN-1L6BKi2IQsuvl4vEYP1g=s160-c-k-c0x00ffffff-no-rj" />
                    <span>잡캐헨리</span>
                </div>
            </div>
        </>
    );
}

let developerChannelId = {
    이정환: "UCn7yFtl60fQsRtEaoyuzFUg",
};

async function RecoDeveloper() {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string;
    const searchDevelpoer = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=date&channelId=${developerChannelId.이정환}&maxResults=12&key=${apiKey}`
    ).then((response) => {
        if (response.ok) return response.json();
    });

    console.log(searchDevelpoer);

    return (
        <div>
            <div>{searchDevelpoer.items[0].snippet.title}</div>
        </div>
    );
}

export default function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.swiper__section}>
                <section>
                    <h2>제작에 참고한 유튜버</h2>
                    <DeverloperVideo />
                </section>
            </div>
            <div className={styles.video__list}>
                <section>
                    <h2>Next.js 유튜브 영상</h2>
                    <RecoDeveloper />
                </section>
            </div>
        </div>
    );
}
