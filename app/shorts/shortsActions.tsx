'use client';

import style from './shortsActions.module.css';

import {
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from 'react-icons/ai';

export default function ShortsActions({
  onModalToggle,
}: {
  onModalToggle: (type: 'comment' | 'share') => void;
}) {
  return (
    <form className={style.actions__container}>
      <button type="button" className={style.action__button}>
        <AiOutlineLike />
        <span className={style.button__text}>count</span>
      </button>
      <button
        type="button"
        className={style.action__button}
        onClick={() => onModalToggle('comment')}
      >
        <AiOutlineMessage />
        <span className={style.button__text}>count</span>
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
