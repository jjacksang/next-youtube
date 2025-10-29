'use client';

import style from './video-list-client.module.css';

import { IChannel, IEnrichedPlaylist, IEnrichedVideo } from '../utils/type';
import VideoItem from '../components/video/video-item';
import { RecoChannel } from '../components/reco-channel';
import useSearchInfiniteQuery, {
  InitialYoutubeData,
} from '../hooks/useSearchInfiniteQuery';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import SkeletonGrid from '../components/skeleton/skeleton-grid';
import NotFound from './not-found';
import { Video } from '../components/video/video-item2';
import useSearchInfiniteQuery2 from '../hooks/useSearchInfiniteQuery2';

interface IVideoProps {
  initialQuery: string;
  initialVideos: Video[];
  nextPageToken: string;
}

// function getVideoOrPlaylistKey(
//   item: IEnrichedVideo | IEnrichedPlaylist,
// ): string {
//   if (item.id.kind === 'youtube#video') return item.id.videoId;
//   if (item.id.kind === 'youtube#playlist') return item.id.playlistId;
//   return '';
// }

export const VideoListClient = ({
  initialQuery,
  initialVideos,
  nextPageToken,
}: IVideoProps) => {
  const initialData = { items: initialVideos, nextPageToken: nextPageToken };
  console.log(initialVideos);
  // const initialData: InitialYoutubeData = {
  //   items: initialVideos,
  //   nextPageToken: nextPageToken,
  // };

  // // 무한스크롤 감지
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // const {
  //   status,
  //   allVideos,
  //   allChannels,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useSearchInfiniteQuery(initialQuery, initialData);
  // console.log('REACT QUERY ACTIVE : ', { ...allChannels, ...allVideos });

  const { status, videos, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchInfiniteQuery2(initialQuery, initialData);

  // // intersection observer 감지
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && status === 'success') {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, status, fetchNextPage]);

  if (status === 'pending') return <SkeletonGrid />;

  if (status === 'error') return <div>Error</div>;

  if (status === 'success' && videos.length === 0) return <NotFound />;

  return (
    <>
      {initialVideos && initialVideos.length > 0 ? (
        // <RecoChannel channel={allChannels[0]} />
        <></>
      ) : (
        <>
          <NotFound />
        </>
      )}
      <div className={style.video} key="video-list">
        {initialVideos.map(item => (
          <VideoItem key={item.title} video={item} />
        ))}
      </div>
      <div className={style.skeleton__tab}>
        {isFetchingNextPage && hasNextPage && <SkeletonGrid key={4} />}

        <div ref={ref} className={style.trigger}></div>
      </div>
    </>
  );
};
