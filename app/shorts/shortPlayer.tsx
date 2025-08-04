'use client';

import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
});

export default function ShortsPlayer({ shorts }: { shorts: any[] }) {
  console.log(shorts);
  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${shorts[0].id}`}
      playing
      controls={false}
      height="100%"
      width="100%"
    />
  );
}
