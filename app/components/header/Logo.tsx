import style from "./Logo.module.css";
import React from "react";
import Link from "next/link";

const Logo = ({ toggleMenu }: { toggleMenu: () => void }) => {
    return (
        <h1 className={style.logo}>
            <Link href={"/"}>
                <em aria-hidden="true" onClick={toggleMenu}></em>
                <span>
                    chop
                    <br />
                    youtube
                </span>
            </Link>
        </h1>
    );
};

export default Logo;
