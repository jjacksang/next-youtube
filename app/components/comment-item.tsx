'use client';

import { BiLike } from 'react-icons/bi';
import styles from './comment-item.module.css';
import { ICommentList } from '../utils/type';

export default function CommentItem({ htmlText }: { htmlText: ICommentList }) {
  return (
    <div className={styles.comment__container}>
      <div className={styles.comment}>
        <span>{htmlText.snippet.topLevelComment.snippet.textOriginal}</span>
      </div>
      <div className={styles.comment__icon}>
        <BiLike />
        {htmlText.snippet.topLevelComment.snippet.likeCount}
      </div>
    </div>
  );
}
