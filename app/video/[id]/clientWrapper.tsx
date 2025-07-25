'use client';

import { IVideoDetail } from '@/app/utils/type';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

interface IVideoWrapper {
  videoDetails: {
    items: IVideoDetail[];
  };
  channelThumbnail: string;
  id: string;
  authorChannelId: string;
}

export default function ClientWrapper({
  videoDetails,
  channelThumbnail,
  authorChannelId,
  id,
}: IVideoWrapper) {
  const VideoPageClient = dynamic(() => import('./video-page-client'), {
    ssr: false,
  });

  useEffect(() => {
    if (window.location.search === '?') {
      window.history.replaceState({}, window.location.pathname);
      console.log('USEEFFECT!!');
    }
  });

  return (
    <VideoPageClient
      videoDetails={videoDetails}
      channelThumbnail={channelThumbnail}
      authorChannelId={authorChannelId}
      id={id}
    />
  );
}
