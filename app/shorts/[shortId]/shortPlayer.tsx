'use client';

import styles from './shortPlayer.module.css';

import dynamic from 'next/dynamic';
import ShortsActions from './shortsActions';
import CommentModal from '../../components/modal/CommentModal';
import { useModalManager } from '../../hooks/useModalManager';
import ShareModal from '../../components/modal/ShareModal';

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
});

export default function ShortsPlayer({ shorts }: { shorts: any[] }) {
  const { modal, openModal, closeModal } = useModalManager();

  console.log(shorts);
  return (
    <div className={styles.player__wrapper}>
      <div
        className={styles.player__background}
        style={{
          backgroundImage: `url(${shorts[0].snippet.thumbnails.default.url as string})`,
        }}
      />
      <div className={styles.player__foreground}>
        <ReactPlayer
          className={styles.player}
          url={`https://www.youtube.com/watch?v=${shorts[0].id}`}
          playing={true}
          loop={true}
          controls={false}
          height="100%"
          width="80%"
        />
        <ShortsActions
          onModalToggle={openModal}
          likeCount={shorts[0].statistics.likeCount}
          commentCount={shorts[0].statistics.commentCount}
        />
      </div>

      {/* Modal */}
      <div className={styles.modal}>
        {modal === 'comment' && <CommentModal onClose={closeModal} />}
        {modal === 'share' && <ShareModal onClose={closeModal} />}
      </div>
    </div>
  );
}
