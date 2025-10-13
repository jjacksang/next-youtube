import Header from './components/header/header';
import SearchBar from './components/searchBar';
import style from './layout.module.css';
import './globals.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Suspense } from 'react';
import { Metadata } from 'next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header className={style.header}>
          <Header />
        </header>
        <main className={style.main} id="main" role="main">
          <SearchBar />
          <Suspense>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Choptube Project',
  description: 'Choptube에 오신걸 환영합니다.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};
