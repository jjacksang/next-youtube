import styles from "./page.module.css";
import { processVideoData } from "./utils/process-video-data";
import { RecoDeveloper } from "./components/reco-developer";

async function DeverloperVideo() {
    return (
        <>
            <div className={styles.youtuber}>
                <div className={styles.youtuber__profile}>
                    <img
                        src="https://yt3.googleusercontent.com/tEHzde-2oKTr_PITRkIu8rdBs_0dUiOpWcPjZ-Taa9adri1lejaide2vjnDAhfH4jUn6EP4g=s160-c-k-c0x00ffffff-no-rj"
                        alt="test-img"
                    />
                    <span>이정환 | Winterlood</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img
                        src="https://yt3.ggpht.com/nv365KiAJyURPEBZyCh0SV3hSBnZXbvVXrzRwcNDfgUpXPn9-3_4PY0SkQrAJWnzQOxKqfUtrQ=s88-c-k-c0x00ffffff-no-rj"
                        alt="test-img"
                    />
                    <span>Dave Gray</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img
                        src="https://yt3.googleusercontent.com/ytc/AIdro_lbqqh0NSFeq6P1F-6qRycC37MtiGyMjZFVsZ4J-c6C474=s160-c-k-c0x00ffffff-no-rj"
                        alt="test-img"
                    />
                    <span>생활코딩</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img
                        src="https://yt3.googleusercontent.com/ytc/AIdro_lGam0UvO8iBSBx0Aackj6laHETsKi_8uMFfPy9lMmRfA=s160-c-k-c0x00ffffff-no-rj"
                        alt="test-img"
                    />
                    <span>webdecoded</span>
                </div>
                <div className={styles.youtuber__profile}>
                    <img
                        src="https://yt3.googleusercontent.com/1-JruRYG7BEWlF0kjrMaJzGMBC9ywqX0dWwDHPHZRDoZ_UwQdiWLN-1L6BKi2IQsuvl4vEYP1g=s160-c-k-c0x00ffffff-no-rj"
                        alt="test-img"
                    />
                    <span>잡캐헨리</span>
                </div>
            </div>
        </>
    );
}

const developerChannelId: IDeveloperId[] = [
    { name: "이정환", key: "UCn7yFtl60fQsRtEaoyuzFUg" },
    { name: "Dave Gray", key: "UCY38RvRIxYODO4penyxUwTg" },
    { name: "webdecoded", key: "UCObrjoZZJSjznfCO5Vx9qUQ" },
    { name: "생활코딩", key: "UCvc8kv-i5fvFTJBFAk6n1SA" },
    { name: "코딩하는누나", key: "UCfBvs0ZJdTA43NQrnI9imGA" },
];

interface IDeveloperId {
    name: string;
    key: string;
}

export default async function Home() {
    const channelDataPromises = developerChannelId.map(async (channel) => {
        try {
            const response = await fetch(
                `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=date&regionCode=KR&channelId=${channel.key}&maxResults=12&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string}`,
                { cache: "force-cache" }
            );

            if (!response.ok) {
                console.error(
                    `Failed to fetch data ${channel.name}, ${response.statusText}`
                );
                return {
                    videoWithViewCount: [],
                    nextPageToken: "",
                };
            }

            const result = await response.json();
            console.log(result);

            const { videoWithViewCount, nextPageToken } =
                await processVideoData(result);

            return {
                videoWithViewCount,
                nextPageToken,
            };
        } catch (err) {
            console.error(`channel promises is failed ${err}`);
            return {
                videoWithViewCount: [],
                nextPageToken: "",
            };
        }
    });

    // 최종 데이터 반환
    const data = await Promise.all(channelDataPromises);
    console.log(data);

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
                    {data.map((item, idx: number) => (
                        <div
                            key={`${developerChannelId[idx].name}님의 영상목록`}
                        >
                            <h2
                                key={`youtube-channel-video-${developerChannelId[idx].name}`}
                            >
                                {developerChannelId[idx].name}님의 영상목록
                            </h2>
                            <RecoDeveloper
                                channelVideos={item.videoWithViewCount}
                            />
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
