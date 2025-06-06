import style from './page.module.css';

import { Suspense } from 'react';
import { fetchYoutubeVideos } from '../utils/api';
import { processVideoData } from '../utils/process-video-data';
import { VideoListClient } from './video-list-client';
import { SkeletonSearch } from '../components/skeleton-search';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const SkeletonList = ({ count }: { count: number }) => {
    return new Array(count)
      .fill(0)
      .map((_, idx) => <SkeletonSearch key={`video-skeleton-${idx}`} />);
  };

  return (
    <div className={style.contanier}>
      <Suspense
        fallback={
          <div className={style.video}>
            <SkeletonList count={24} />
          </div>
        }
      >
        <Search searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  console.log('Search Page : ', q);

  try {
    const response = await fetchYoutubeVideos(
      { q: q, maxResults: 24 },
      {
        cache: 'no-store',
      },
    );

    const searchResults = await response.json();

    const { videoWithViewCount, nextPageToken } =
      await processVideoData(searchResults);

    return (
      <VideoListClient
        initialQuery={q}
        initialVideos={videoWithViewCount}
        nextPageToken={nextPageToken}
      />
    );
  } catch (error) {
    console.error('Video Fetching Error', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    return <div>fetching Error</div>;
  }
}
