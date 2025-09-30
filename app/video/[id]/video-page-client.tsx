'use client';

import { VideoDetail } from '@/app/components/video/videoDetail';
import styles from './video-page-client.module.css';

import { CommentProvider } from '@/app/contexts/comment_provider';
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
    <>
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
    </>
  );
}
