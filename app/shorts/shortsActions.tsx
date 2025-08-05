'use client';

import style from './shortsActions.module.css';

import {
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from 'react-icons/ai';

export default function ShortsActions() {
  return (
    <form className={style.actions__container}>
      <button type="button" className={style.action__button}>
        <AiOutlineLike />
        <span className={style.button__text}>count</span>
      </button>
      <button type="button" className={style.action__button}>
        <AiOutlineMessage />
        <span className={style.button__text}>count</span>
      </button>
      <button type="button" className={style.action__button}>
        <AiOutlineShareAlt />
      </button>
    </form>
  );
}
