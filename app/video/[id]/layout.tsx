import { ReactNode } from "react";

export default function VideoLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <div>
            <h2>Hi Im Layout</h2>
            <main>{children}</main>
        </div>
    );
}
