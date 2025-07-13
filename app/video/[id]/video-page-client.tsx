'use client';

import styles from './video-page-client.module.css';

import { VideoDetail } from '@/app/components/videoDetail';
import { CommentProvider } from '@/app/provider/comment_provider';
import { IVideoDetail } from '@/app/utils/type';
import { useRef } from 'react';
import type ReactPlayer from 'react-player';

interface IVideoDetailProps {
  items: IVideoDetail[];
}

interface IVideoPageClient {
  videoDetails: IVideoDetailProps;
  channelThumbnail: string;
  id: string;
  authorChannelId: string;
}

export default function VideoPageClient({
  videoDetails,
  channelThumbnail,
  id,
  authorChannelId,
}: IVideoPageClient) {
  const playerRef = useRef<ReactPlayer | null>(null);

  const handleTimestampClick = (seconds: number) => {
    playerRef.current?.seekTo(seconds, 'seconds');
  };

  return (
    <div>
      <VideoDetail
        playerRef={playerRef}
        videoDetail={videoDetails}
        channelThumbnail={channelThumbnail}
      />
      <div className={styles.comment__container}>
        <div className={styles.comment__form}>
          <h3>{`댓글 ${videoDetails.items[0].statistics.commentCount} 개`}</h3>
        </div>
        <div>
          <CommentProvider
            id={id}
            authorChannelId={authorChannelId}
            onTimestampClick={handleTimestampClick}
          />
        </div>
      </div>
    </div>
  );
}
