import styles from './page.module.css';
import ShortsPlayer from './shortPlayer';
import ShortsActions from './shortsActions';

export default function Shorts() {
  return (
    <div className={styles.shorts__wrapper}>
      <div className={styles.player__container}>
        <ShortsPlayer />
        <ShortsActions />
      </div>
    </div>
  );
}
