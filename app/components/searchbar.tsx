'use client';

import React, { useState, useRef, Suspense } from 'react';
import style from './searchbar.module.css';
import { useSearchParams, useRouter } from 'next/navigation';
import YoutubeLogo from './header/youtube-logo';
import Link from 'next/link';

export default function Searchbar() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}

function Search() {
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const trimmedSearch = search.trim();
    if (!trimmedSearch || q === trimmedSearch) return;

    router.push(`/search?q=${encodeURIComponent(trimmedSearch)}`);

    setSearch('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <form className={style.search__form} onSubmit={onSubmit} role="search">
      <Link href={'/'} className={style.link}>
        <YoutubeLogo />
      </Link>

      <div className={style.search__inner}>
        <label htmlFor="searchInput">
          <span className={style.ir}>검색</span>
        </label>
        <input
          id="searchInput"
          ref={inputRef}
          type="search"
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력해주세요."
          autoComplete="off"
        />
      </div>
    </form>
  );
}
