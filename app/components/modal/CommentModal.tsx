import styles from './CommentModal.module.css';

export default function CommentModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.modal__panel}>
      <div className={styles.modal__header}>
        <h3>댓글보기</h3>
        <button
          className={styles.close__button}
          onClick={onClose}
          type="button"
        >
          X
        </button>
      </div>
    </div>
  );
}
