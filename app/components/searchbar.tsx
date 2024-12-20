"use client";

import style from "./searchbar.module.css";

export default function Searchbar() {
    return (
        <div id="search">
            <div className={style.search__inner}>
                <label htmlFor="searchInput">
                    <span className={style.ir}>검색</span>
                </label>
                <input />
            </div>
        </div>
    );
}
