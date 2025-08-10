import { fetchShortVideos } from '../utils/api';
import styles from './page.module.css';
import ShortsPlayer from './shortPlayer';

async function getShortVideos() {
  const videos = await fetchShortVideos();

  return videos;
}

export default async function Shorts() {
  const videos = await getShortVideos();

  console.log(videos);
  return (
    <div className={styles.shorts__wrapper}>
      <div className={styles.shorts__container}>
        <ShortsPlayer shorts={videos.items} />
      </div>
    </div>
  );
}
