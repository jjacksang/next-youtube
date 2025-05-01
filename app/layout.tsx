import Header from "./components/header/header";
import Searchbar from "./components/searchbar";
import style from "./layout.module.css";
import "./globals.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Suspense } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <Header />
                <main className={style.main} id="main" role="main">
                    <Searchbar />
                    <Suspense>{children}</Suspense>
                </main>
            </body>
        </html>
    );
}
