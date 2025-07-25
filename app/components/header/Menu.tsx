import style from './Menu.module.css';

import { headerMenus } from '@/app/data/header';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Menu = () => {
  const location = usePathname();
  return (
    <nav className={style.menu}>
      <ul className={style.menuList}>
        {headerMenus.map((menu, key) => (
          <li key={key} className={location === menu.src ? 'active' : ''}>
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
