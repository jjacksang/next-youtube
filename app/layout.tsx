import Header from "./components/header/header";
import Searchbar from "./components/searchbar";
<<<<<<< HEAD
import style from "./layout.module.css";
import "./globals.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Suspense } from "react";

=======
import "./globals.css";

>>>>>>> f0ff9b2 (first)
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <Header />
<<<<<<< HEAD
                <main className={style.main} id="main" role="main">
                    <Searchbar />
                    <Suspense>{children}</Suspense>
=======
                <main id="main" role="main">
                    <Searchbar />
                    {children}
>>>>>>> f0ff9b2 (first)
                </main>
            </body>
        </html>
    );
}
