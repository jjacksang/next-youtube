import CloseButton from '../close-button';
import styles from './CommentModal.module.css';

import { CommentProvider } from '@/app/contexts/comment_provider';

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
        <CloseButton onClose={onClose} />
      </div>
      <div className={styles.comment__list}>
        <CommentProvider id={shortId} authorChannelId={ownerId} />
      </div>
    </div>
  );
}
