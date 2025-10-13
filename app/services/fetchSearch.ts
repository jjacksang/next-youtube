import { YoutubeOrderType } from '../utils/type';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

interface IFetchProps {
  q?: string;
  order?: YoutubeOrderType;
  maxResults?: number;
  channelId?: string;
  nextPageToken?: string;
}

interface IFetchOptions extends RequestInit {
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

export const fetchYoutubeVideos = (
  {
    q,
    maxResults = 24,
    nextPageToken,
    channelId,
    order = 'relevance',
  }: IFetchProps,
  options?: IFetchOptions,
) => {
  console.log('fetchYoutubeVideos Params :', q, maxResults, nextPageToken);

  const searchParams = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    regionCode: 'KR',
    type: 'video',
    part: 'snippet',
    maxResults: maxResults.toString(),
    order,
  });

  if (nextPageToken) {
    searchParams.append('nextPageToken', nextPageToken);
  }

  if (q) {
    searchParams.append('q', q);
  }

  if (channelId) {
    searchParams.append('channelId', channelId);
  }

  return fetch(
    `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string}/search?${searchParams.toString()}`,
    options,
  );
};
