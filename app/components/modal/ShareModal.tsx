import styles from './ShareModal.module.css';

export default function ShareModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.modal__panel}>
      <div className={styles.modal__header}>
        <h3>공유하기</h3>
        <button
          className={styles.close__button}
          onClick={onClose}
          type="button"
        >
          X
        </button>
      </div>
      <div className={styles.share__content}>
        <input type="url" />
        <button type="button">복사</button>
      </div>
    </div>
  );
}
