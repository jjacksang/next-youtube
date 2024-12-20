import style from "./Sns.module.css";

import React from "react";
import { snsLink } from "../../data/header";
import Link from "next/link";

const Sns = () => {
    return (
        <div className={style.sns}>
            <ul>
                {snsLink.map((sns, key) => (
                    <li key={key}>
                        <Link
                            href={sns.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={sns.title}
                        >
                            <span style={{ color: "white" }}>{sns.icon}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sns;
