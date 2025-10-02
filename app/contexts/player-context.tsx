'use client';

import { RefObject, createContext, useContext, useRef } from 'react';
import ReactPlayer from 'react-player';

type PlayerRefType = {
  playerRef: RefObject<ReactPlayer | null>;
  focusPlayer: () => void;
};

const PlayerContext = createContext<PlayerRefType | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const playerRef = useRef<ReactPlayer | null>(null);

  const focusPlayer = () => {
    if (playerRef.current) {
      playerRef.current
        .getInternalPlayer()
        ?.scollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <PlayerContext.Provider value={{ playerRef, focusPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be inside PlayerProvider');
  return context;
};
