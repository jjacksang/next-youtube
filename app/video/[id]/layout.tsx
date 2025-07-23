'use client';

import { PlayerProvider } from '@/app/contexts/player-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export default function VideoLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <PlayerProvider>{children}</PlayerProvider>
      </QueryClientProvider>
    </div>
  );
}
