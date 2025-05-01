"use client";

import React, { useState, useRef } from "react";
import style from "./searchbar.module.css";
import { useSearchParams, useRouter } from "next/navigation";

export default function Searchbar() {
    const [search, setSearch] = useState("");
    const searchParams = useSearchParams();
    const q = searchParams.get("q");
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

        setSearch("");

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <form onSubmit={onSubmit} role="search">
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
