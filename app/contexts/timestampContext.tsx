'use client';

import { createContext, useContext } from 'react';

export const TimestampContext = createContext<((s: number) => void) | null>(
  null,
);

export const useTimestamp = () => {
  const context = useContext(TimestampContext);
  if (!context) throw new Error('TimestampContext not found');
  return context;
};
