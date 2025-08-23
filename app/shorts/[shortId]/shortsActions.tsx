'use client';

import { useState } from 'react';
import { formatNumber } from '../../utils/formatNumber';
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
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCounter, setLikeCounter] = useState<number>(likeCount);

  const handleLikeCount = () => {
    if (liked) {
      setLikeCounter(prev => prev + 1);
    } else {
      setLikeCounter(prev => prev - 1);
    }

    setLiked(prev => !prev);
  };

  console.log(likeCounter);
  return (
    <form className={style.actions__container}>
      <button
        type="button"
        className={`${style.action__button} ${liked ? style.liked : ''}`}
        onClick={handleLikeCount}
      >
        <AiOutlineLike className={style.icon} />
        <span className={style.button__text}>{formatNumber(likeCounter)}</span>
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
        <span className={style.button__text}>공유하기</span>
      </button>
    </form>
  );
}
