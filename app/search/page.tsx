import style from './page.module.css';

import { Suspense } from 'react';
import { processVideoData } from '../utils/process-video-data';
import { VideoListClient } from './video-list-client';
import { SkeletonSearch } from '../components/skeleton/skeleton-search';
import { fetchSearchVideos } from '../services/fetchSearch';
import { parseJson } from '../utils/fetcher';
import { fetchVideoDetails } from '../services/fetchVideoDetail';

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
    const response = await fetchSearchVideos({
      q: q,
      order: 'date',
      maxResults: 24,
    });
    const results = await parseJson(response);

    const ids = results.items.map(({ id }) => id.videoId);
    const detailResponse = await fetchVideoDetails({ ids });
    const parsedDetail = await parseJson(detailResponse);
    const videos = parsedDetail.items.map(({ id, snippet, statistics }) => ({
      id: id,
      channelId: snippet.channelId,
      description: snippet.description,
      thumbnailUrl: snippet.thumbnails.medium.url,
      title: snippet.title,
      channelTitle: snippet.channelTitle,
      viewCount: statistics.viewCount,
      publishTime: snippet.publishedAt,
    }));

    return (
      <VideoListClient
        initialQuery={q}
        initialVideos={videos}
        nextPageToken={results.nextPageToken}
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
