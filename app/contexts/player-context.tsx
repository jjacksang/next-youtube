'use client';

import { RefObject, createContext, useContext, useRef } from 'react';
import ReactPlayer from 'react-player';

type PlayerRefType = {
  playerRef: RefObject<ReactPlayer | null>;
  focusPlayer: () => void;
  playerContainerRef: RefObject<HTMLDivElement | null>;
};

const PlayerContext = createContext<PlayerRefType | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  const focusPlayer = () => {
    const el = playerContainerRef.current;
    console.log('focusPlayer called');
    console.log('reactPlayerRef.current: ', playerRef.current);
    console.log('focusPlayer el: ', el);

    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // if (playerRef.current) {
    //   playerRef.current
    //     .getInternalPlayer()
    //     ?.scollIntoView({ behavior: 'smooth', block: 'center' });
    // }
  };

  return (
    <PlayerContext.Provider
      value={{ playerRef, focusPlayer, playerContainerRef }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be inside PlayerProvider');
  return context;
};
