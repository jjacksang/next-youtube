import CloseButton from '../button/close-button';
import CButton from '../button/copy-button';
import styles from './ShareModal.module.css';

export default function ShareModal({ onClose }: { onClose: () => void }) {
  console.log(window.location.href);
  return (
    <div className={styles.modal__panel}>
      <div className={styles.modal__header}>
        <h3>공유하기</h3>
        <CloseButton onClose={onClose} />
      </div>
      <label className={styles.share__content}>
        <input
          className={styles.share__input}
          value={window.location.href as string}
          readOnly={true}
          type="text"
        />
        <CButton text={window.location.href as string} />
      </label>
    </div>
  );
}
