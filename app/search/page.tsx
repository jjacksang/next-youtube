import style from './page.module.css';

import { Suspense } from 'react';
import { VideoListClient } from './video-list-client';
import { SkeletonSearch } from '../components/skeleton/skeleton-search';
import { fetchSearchVideos } from '../services/fetchSearch';
import { parseJson } from '../utils/fetcher';
import { fetchVideoDetails } from '../services/fetchVideoDetail';
import { fetchChannelDetails } from '../services/fetchChannelDetails';

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
    <div className={style.container}>
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

  const response = await fetchSearchVideos({
    q: q,
    order: 'date',
    maxResults: 24,
  });
  const results = await parseJson(response);

  // video id목록 추출 후 detail 요청
  const ids = results.items.map(({ id }) => id.videoId);
  const detailResponse = await fetchVideoDetails({ ids });
  const parsedDetail = await parseJson(detailResponse);

  // channel id목록 추출 후 thumbnails 요청
  const channelIds = parsedDetail.items.map(id => id.snippet.channelId);
  const channelDetailsResponse = await fetchChannelDetails({ channelIds });
  const parsedChannelDetails = await parseJson(channelDetailsResponse);

  const channelThumbnailMap = parsedChannelDetails.items.reduce(
    (acc, { id, snippet }) => {
      acc[id] = snippet.thumbnails.default.url ?? null;
      return acc;
    },
    {} as Record<string, string | null>,
  );

  console.log(channelThumbnailMap);

  const videos = parsedDetail.items.map(({ id, snippet, statistics }) => ({
    id: id,
    channelId: snippet.channelId,
    description: snippet.description,
    thumbnailUrl: snippet.thumbnails.medium.url,
    channelThumbnailUrl: channelThumbnailMap[snippet.channelId] ?? null,
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
  // try {

  // } catch (error) {
  //   console.error('Video Fetching Error', error);
  //   if (error instanceof Error) {
  //     console.error('Error stack:', error.stack);
  //   }
  //   return <div>fetching Error</div>;
  // }
}
