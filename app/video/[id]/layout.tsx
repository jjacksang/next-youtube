import { ReactNode } from "react";

export default function VideoLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
}
