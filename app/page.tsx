import styles from './page.module.css';
import { processVideoData } from './utils/process-video-data';
import { RecoDeveloper } from './components/reco-developer';
import Image from 'next/image';
import Link from 'next/link';
import { IEnrichedPlaylist, IEnrichedVideo } from './utils/type';

const developerChannelId: IDeveloperId[] = [
  { name: '이정환', key: 'UCn7yFtl60fQsRtEaoyuzFUg' },
  { name: 'Dave Gray', key: 'UCY38RvRIxYODO4penyxUwTg' },
  { name: 'webdecoded', key: 'UCObrjoZZJSjznfCO5Vx9qUQ' },
  { name: '코딩알려주는누나', key: 'UCfBvs0ZJdTA43NQrnI9imGA' },
];

interface IDeveloperId {
  name: string;
  key: string;
}

export default async function Home() {
  const channelDataPromises = developerChannelId.map(async channel => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=date&regionCode=KR&channelId=${channel.key}&maxResults=12&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string}`,
        { cache: 'force-cache' },
      );

      if (!response.ok) {
        console.error(
          `Failed to fetch data ${channel.name}, ${response.statusText}`,
        );
        return {
          videoWithViewCount: [],
          nextPageToken: '',
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
        nextPageToken: '',
      };
    }
  });

  // 최종 데이터 반환
  const data = await Promise.all(channelDataPromises);
  console.log(data);

  return (
    <div className={styles.home}>
      <div className={styles.swiper__section}>
        <h2>제작에 참고한 유튜버</h2>
        <section className={styles.youtuber}>
          {data.map((item, idx: number) => {
            const videoInfo = item.videoWithViewCount.filter(
              (v): v is IEnrichedVideo => 'viewCount' in v,
            );
            return (
              <DeverloperVideo
                channelInfo={videoInfo}
                key={`youtuber.${idx}`}
              />
            );
          })}
        </section>
      </div>
      <div className={styles.video__list}>
        <section>
          {data.map((item, idx: number) => (
            <div key={`${developerChannelId[idx].name}님의 영상목록`}>
              <h2
                className={styles.swiper__h2}
                key={`youtube-channel-video-${developerChannelId[idx].name}`}
              >
                {developerChannelId[idx].name}님의 영상목록
              </h2>
              <RecoDeveloper
                channelVideos={item.videoWithViewCount.filter(
                  (v): v is IEnrichedVideo | IEnrichedPlaylist =>
                    v.id.kind === 'youtube#video' ||
                    v.id.kind === 'youtube#playlist',
                )}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

async function DeverloperVideo({
  channelInfo,
}: {
  channelInfo: IEnrichedVideo[];
}) {
  console.log(channelInfo);
  return (
    <div className={styles.youtuber__profile}>
      <Link
        className={styles.tag}
        href={`/channel/${channelInfo[0].snippet.channelId}`}
      >
        <Image
          className={styles.youtuber__img}
          src={channelInfo[0].snippet.channelThumbnail as string}
          alt={channelInfo[0].snippet.channelThumbnail as string}
          width={120}
          height={120}
        />
      </Link>
      <span>{channelInfo[0].snippet.channelTitle}</span>
    </div>
  );
}
