'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { PlayerProvider } from '../contexts/player-context';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>{children}</PlayerProvider>
    </QueryClientProvider>
  );
}
