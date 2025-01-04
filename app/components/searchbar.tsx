"use client";

import React, { useState } from "react";
import style from "./searchbar.module.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Searchbar() {
    const [search, setSearch] = useState("");
    const searchParams = useSearchParams();
    const q = searchParams.get("q");
    const router = useRouter();

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSubmit = () => {
        if (!search || q === search) return;
        router.push(`/search?q=${search}`);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <div className={style.search__inner}>
            <label htmlFor="searchInput">
                <span className={style.ir}>검색</span>
            </label>
            <input
                value={search}
                onChange={onChangeSearch}
                onKeyDown={onKeyDown}
                placeholder="검색어를 입력해주세요."
            />
        </div>
    );
}
