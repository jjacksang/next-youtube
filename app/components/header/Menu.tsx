import style from "./Menu.module.css";

import { headerMenus, searchKeyword } from "@/app/data/header";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
    const location = usePathname();
    return (
        <nav className={style.menu}>
            <ul className={style.menuList}>
                {headerMenus.map((menu, key) => (
                    <li
                        key={key}
                        className={location === menu.src ? "active" : ""}
                    >
                        <Link href={menu.src}>
                            {menu.icon}
                            <span>{menu.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className={style.keyword}>
                {searchKeyword.map((keyword, key) => (
                    <li
                        key={key}
                        className={location === keyword.src ? "active" : ""}
                    >
                        <Link href={keyword.src}>{keyword.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;
