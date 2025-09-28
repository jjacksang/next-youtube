import CloseButton from '../close-button';
import styles from './ShareModal.module.css';

export default function ShareModal({ onClose }: { onClose: () => void }) {
  const clipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드 복사 성공');
      console.log(text);
    } catch (error) {
      console.error('클립보드 복사 실패', error);
    }
  };

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
          defaultValue={window.location.href as string}
          readOnly={true}
          type="url"
        />
        <button
          type="button"
          onClick={() => clipBoard(window.location.href as string)}
        >
          복사
        </button>
      </label>
    </div>
  );
}
