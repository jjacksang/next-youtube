'use client';

import { BiLike } from 'react-icons/bi';
import styles from './comment-item.module.css';
import { ICommentList } from '../utils/type';
import { useTimestamp } from '../contexts/timestampContext';
import { useId } from 'react';
import { useIsOverflowing } from '../hooks/useIsOverflowing';

interface CommentItemProps {
  comment: ICommentList;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const onTimestampClick = useTimestamp();
  const timeRegex = /(\b\d{1,2}:\d{2}(?::\d{2})?\b)/g;

  const parseTimeToSeconds = (time: string) => {
    const parts = time.split(':').map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  };

  const parts = comment.snippet.topLevelComment.snippet.textOriginal
    .split(timeRegex)
    .map((part, index) => {
      if (timeRegex.test(part)) {
        const seconds = parseTimeToSeconds(part);
        return (
          <button
            key={index}
            className={styles.timestamp}
            onClick={() => onTimestampClick(seconds)}
            type="button"
          >
            {part}
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });

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
        <form>{parts}</form>
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
