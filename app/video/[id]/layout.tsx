"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function VideoLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    const queryClient = new QueryClient();

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <main>{children}</main>
            </QueryClientProvider>
        </div>
    );
}
