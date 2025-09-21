import style from './Logo.module.css';
import Link from 'next/link';
import YoutubeLogo from './youtube-logo';

const Logo = () => {
  return (
    <h1 className={style.logo}>
      <Link href={'/'}>
        <YoutubeLogo />
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
