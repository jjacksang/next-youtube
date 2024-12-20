"use client";
import style from "./header.module.css";

import { useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Sns from "./Sns";

export default function Header() {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    };

    return (
        <header className={style.header} id="header" role="banner">
            <Logo toggleMenu={toggleMenu} />
            <Menu />
            <Sns />
        </header>
    );
}
