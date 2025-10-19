import style from './header.module.css';

import Logo from './Logo';
import Menu from './Menu';
import Sns from './Sns';

export default function Header() {
  return (
    <header className={style.header} id="header" role="banner">
      <Logo />
      <Menu />
      <Sns />
    </header>
  );
}
