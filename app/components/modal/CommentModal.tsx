import { CommentProvider } from '@/app/contexts/comment_provider';
import styles from './CommentModal.module.css';

interface Props {
  onClose: () => void;
  shortId: string;
  ownerId: string;
}

export default function CommentModal({ onClose, shortId, ownerId }: Props) {
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
      <div className={styles.comment__list}>
        <CommentProvider id={shortId} authorChannelId={ownerId} />
      </div>
    </div>
  );
}
