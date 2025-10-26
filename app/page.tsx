import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { fetchSearchVideos } from './services/fetchSearch';
import { parseJson } from './utils/fetcher';
import { fetchVideoDetails } from './services/fetchVideoDetail';
import { VideoSwiper2 } from './components/swiper/videoSwiper2';
import { fetchChannelDetails } from './services/fetchChannelDetails';

interface IDeveloperId {
  name: string;
  key: string;
}

const developerChannelId: IDeveloperId[] = [
  { name: '이정환', key: 'UCn7yFtl60fQsRtEaoyuzFUg' },
  { name: 'Dave Gray', key: 'UCY38RvRIxYODO4penyxUwTg' },
  { name: 'webdecoded', key: 'UCObrjoZZJSjznfCO5Vx9qUQ' },
  { name: '코딩알려주는누나', key: 'UCfBvs0ZJdTA43NQrnI9imGA' },
];

export default async function Home() {
  const developerChannelIds = developerChannelId.map(data => data.key);

  console.log(developerChannelIds);

  return (
    <div className={styles.home}>
      <div className={styles.swiper__section}>
        <h2>제작에 참고한 유튜버</h2>
        <section className={styles.youtuber}>
          <DeveloperChannel ids={developerChannelIds} />
        </section>
      </div>
      <div className={styles.video__list}>
        <section>
          {developerChannelId.map(({ name, key }) => {
            return (
              <div key={key}>
                <h2 className={styles.swiper__h2}>{name}님의 영상목록</h2>
                <DeveloperSection name={name} id={key} />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

async function DeveloperSection({ id, name }: { id: string; name: string }) {
  const response = await fetchSearchVideos(
    { channelId: id, order: 'date', maxResults: 12 },
    { cache: 'force-cache' },
  );

  if (!response.ok) {
    console.error(`Failed to fetch data ${name}, ${response.statusText}`);
    return;
  }
  const results = await parseJson(response);
  // video id목록 추출 후 detail 요청
  const ids = results.items.map(({ id }) => id.videoId);
  const detailResponse = await fetchVideoDetails({ ids });
  const parsedDetail = await parseJson(detailResponse);

  // channel id목록 추출 후 thumbnails 요청
  const channelIds = parsedDetail.items.map(id => id.snippet.channelId);
  const channelDetailsResponse = await fetchChannelDetails({ channelIds });
  const parsedChannelDetails = await parseJson(channelDetailsResponse);

  const channelThumbnailMap = parsedChannelDetails.items.reduce(
    (acc, { id, snippet }) => {
      acc[id] = snippet.thumbnails.default.url ?? null;
      return acc;
    },
    {} as Record<string, string | null>,
  );

  console.log(channelThumbnailMap);

  const videos = parsedDetail.items.map(({ id, snippet, statistics }) => ({
    id: id,
    channelId: snippet.channelId,
    description: snippet.description,
    thumbnailUrl: snippet.thumbnails.medium.url,
    channelThumbnailUrl: channelThumbnailMap[snippet.channelId] ?? null,
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    viewCount: statistics.viewCount,
    publishTime: snippet.publishedAt,
  }));

  console.log(videos);

  return (
    <div>
      <VideoSwiper2 videos={videos} />
    </div>
  );
}
async function DeveloperChannel({ ids }: { ids: string[] }) {
  const response = await fetchChannelDetails({ channelIds: ids });
  const results = await parseJson(response);

  console.log('RESULTS', results);
  return (
    <>
      {results.items.map(item => {
        return (
          <div className={styles.youtuber__profile}>
            <Link className={styles.tag} href={`/channel/${item.id}`}>
              <Image
                className={styles.youtuber__img}
                src={item.snippet.thumbnails.default.url as string}
                alt={item.snippet.description}
                width={120}
                height={120}
              />
            </Link>
            <span>{item.snippet.title}</span>
          </div>
        );
      })}
    </>
  );
}
