'use client';

import { BiLike } from 'react-icons/bi';
import styles from './comment-item.module.css';
import { ICommentList } from '../utils/type';
import { useTimestamp } from '../contexts/timestampContext';

interface CommentItemProps {
  comment: ICommentList;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const onTimestampClick = useTimestamp();

  return (
    <div className={styles.comment__container}>
      <div className={styles.comment}>
        <span>{comment.snippet.topLevelComment.snippet.textOriginal}</span>
      </div>
      <span className={styles.comment__icon}>
        <BiLike />
        {comment.snippet.topLevelComment.snippet.likeCount}
      </span>
    </div>
  );
}
