'use client';

import styles from './shortPlayer.module.css';

import dynamic from 'next/dynamic';
import ShortsActions from './shortsActions';

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
});

export default function ShortsPlayer({ shorts }: { shorts: any[] }) {
  console.log(shorts);
  return (
    <div className={styles.player__wrapper}>
      <div
        className={styles.player__background}
        style={{
          backgroundImage: `url(${shorts[0].snippet.thumbnails.default.url})`,
        }}
      />
      <div className={styles.player__foreground}>
        <ReactPlayer
          className={styles.player}
          url={`https://www.youtube.com/watch?v=${shorts[0].id}`}
          playing
          controls={false}
          height="100%"
          width="80%"
        />
        <ShortsActions />
      </div>
    </div>
  );
}
