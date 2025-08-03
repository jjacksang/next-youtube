'use client';

import style from './shortsActions.module.css';

import {
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from 'react-icons/ai';

export default function ShortsActions() {
  return (
    <div className={style.actions__container}>
      <button type="button" className={style.action__button}>
        <AiOutlineLike />
      </button>
      <button type="button" className={style.action__button}>
        <AiOutlineMessage />
      </button>
      <button type="button" className={style.action__button}>
        <AiOutlineShareAlt />
      </button>
    </div>
  );
}
