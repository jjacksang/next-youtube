'use client';

import { BiLike } from 'react-icons/bi';
import styles from './comment-item.module.css';
import { ICommentList } from '../../utils/type';
import { useId } from 'react';
import { useIsOverflowing } from '../../hooks/useIsOverflowing';
import { useTimestampParts } from '@/app/hooks/useTimestampParts';

interface CommentItemProps {
  comment: ICommentList;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const parts = useTimestampParts(
    comment.snippet.topLevelComment.snippet.textOriginal,
  );

  const uniqueId = useId();
  const { isOverflowing } = useIsOverflowing<HTMLSpanElement>(2);

  return (
    <div className={styles.comment__container}>
      <div className={styles.comment}>
        <input
          type="checkbox"
          id={`commentToggle-${uniqueId}`}
          className={styles.comment_more_btn}
        />
        <span className={styles.comment_text}>{parts}</span>
        {isOverflowing && (
          <label
            htmlFor={`commentToggle-${uniqueId}`}
            className={styles.comment_label}
          ></label>
        )}
      </div>
      <span className={styles.comment__icon}>
        <BiLike className={styles.like__button} />
        {comment.snippet.topLevelComment.snippet.likeCount}
      </span>
    </div>
  );
}
