import Header from "./components/header/header";
import Searchbar from "./components/searchbar";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <Header />
                <main id="main" role="main">
                    <Searchbar />
                    {children}
                </main>
            </body>
        </html>
    );
}
