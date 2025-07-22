'use client';

import { PlayerProvider } from '@/app/contexts/player-context';
import styles from './video-page-client.module.css';

import { VideoDetail } from '@/app/components/videoDetail';
import { CommentProvider } from '@/app/provider/comment_provider';
import { IVideoDetail } from '@/app/utils/type';

interface IVideoPageClient {
  videoDetails: {
    items: IVideoDetail[];
  };
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
  return (
    <PlayerProvider>
      <VideoDetail
        videoDetail={videoDetails}
        channelThumbnail={channelThumbnail}
      />
      <div className={styles.comment__container}>
        <div className={styles.comment__form}>
          <h3>{`댓글 ${videoDetails.items[0].statistics.commentCount} 개`}</h3>
        </div>
        <div>
          <CommentProvider id={id} authorChannelId={authorChannelId} />
        </div>
      </div>
    </PlayerProvider>
  );
}
