'use client';

import { formatNumber } from '../utils/formatNumber';
import style from './shortsActions.module.css';

import {
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from 'react-icons/ai';

export default function ShortsActions({
  onModalToggle,
  likeCount,
  commentCount,
}: {
  onModalToggle: (type: 'comment' | 'share') => void;
  likeCount: number;
  commentCount: number;
}) {
  return (
    <form className={style.actions__container}>
      <button type="button" className={style.action__button}>
        <AiOutlineLike />
        <span className={style.button__text}>{formatNumber(likeCount)}</span>
      </button>
      <button
        type="button"
        className={style.action__button}
        onClick={() => onModalToggle('comment')}
      >
        <AiOutlineMessage />
        <span className={style.button__text}>{formatNumber(commentCount)}</span>
      </button>
      <button
        type="button"
        className={style.action__button}
        onClick={() => onModalToggle('share')}
      >
        <AiOutlineShareAlt />
      </button>
    </form>
  );
}
