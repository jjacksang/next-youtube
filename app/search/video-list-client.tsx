'use client';

import style from './video-list-client.module.css';

import { IChannel, IEnrichedVideo } from '../utils/type';
import VideoItem from '../components/video-item';
import { RecoChannel } from '../components/reco-channel';
import useSearchInfinietQuery, {
  InitialYoutubeData,
} from '../hooks/useSearchInfiniteQuery';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

type YoutubeItems = (IEnrichedVideo | IChannel)[];

export const VideoListClient = ({
  initialQuery,
  initialVideos,
  nextPageToken,
}: {
  initialQuery: string;
  initialVideos: YoutubeItems;
  nextPageToken: string;
}) => {
  const initialData: InitialYoutubeData = {
    items: initialVideos,
    nextPageToken: nextPageToken,
  };

  // 무한스크롤 감지
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const {
    status,
    allVideos,
    allChannels,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchInfinietQuery(initialQuery, initialData);
  console.log('REACT QUERY ACTIVE : ', { ...allChannels, ...allVideos });

  // intersection observer 감지
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && status === 'success') {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, status]);

  return (
    <>
      {allChannels && allChannels.length > 0 ? (
        <RecoChannel channel={allChannels[0]} />
      ) : (
        <></>
      )}
      <div className={style.video} key="video-list">
        {allVideos.map(item => (
          <VideoItem key={item.id.videoId} video={item} />
        ))}
      </div>
      <div className={style.moreBtn}>
        {status !== 'success' ? <div>spiner part</div> : <div ref={ref}></div>}
      </div>
    </>
  );
};
