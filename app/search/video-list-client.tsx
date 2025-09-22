'use client';

import style from './video-list-client.module.css';

import { IChannel, IEnrichedPlaylist, IEnrichedVideo } from '../utils/type';
import VideoItem from '../components/video-item';
import { RecoChannel } from '../components/reco-channel';
import useSearchInfinietQuery, {
  InitialYoutubeData,
} from '../hooks/useSearchInfiniteQuery';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import SkeletonGrid from '../components/skeleton/skeleton-grid';
import NotFound from './not-found';

type YoutubeItems = (IEnrichedVideo | IEnrichedPlaylist | IChannel)[];

function getVideoOrPlaylistKey(
  item: IEnrichedVideo | IEnrichedPlaylist,
): string {
  if (item.id.kind === 'youtube#video') return item.id.videoId;
  if (item.id.kind === 'youtube#playlist') return item.id.playlistId;
  return '';
}

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
  }, [inView, hasNextPage, isFetchingNextPage, status, fetchNextPage]);

  if (status === 'pending') return <SkeletonGrid />;

  if (status === 'error') return <div>Error</div>;

  if (status === 'success' && allVideos.length === 0) return <NotFound />;

  return (
    <>
      {allChannels && allChannels.length > 0 ? (
        <RecoChannel channel={allChannels[0]} />
      ) : (
        <></>
      )}
      <div className={style.video} key="video-list">
        {allVideos.map(item => (
          <VideoItem key={getVideoOrPlaylistKey(item)} video={item} />
        ))}
      </div>
      <div className={style.skeleton__tab}>
        {isFetchingNextPage && hasNextPage && <SkeletonGrid key={4} />}

        <div ref={ref} className={style.trigger}></div>
      </div>
    </>
  );
};
