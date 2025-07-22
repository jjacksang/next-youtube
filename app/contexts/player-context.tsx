'use client';

import { RefObject, createContext, useContext, useRef } from 'react';
import ReactPlayer from 'react-player';

type PlayerRefType = RefObject<ReactPlayer | null>;

const PlayerContext = createContext<PlayerRefType | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  return (
    <PlayerContext.Provider value={playerRef}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be inside PlayerProvider');
  return context;
};
