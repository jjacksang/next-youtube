'use client';

import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
});

export default async function ShortsPlayer() {
  return <ReactPlayer playing controls={false} height="100%" width="100%" />;
}
