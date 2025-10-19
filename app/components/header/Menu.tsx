import style from './Menu.module.css';

import { headerMenus } from '@/app/data/header';
import Link from 'next/link';

const Menu = () => {
  return (
    <nav className={style.menu}>
      <ul className={style.menuList}>
        {headerMenus.map((menu, key) => (
          <li key={key}>
            <Link href={menu.src}>
              {menu.icon}
              <span>{menu.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
