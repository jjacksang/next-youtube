import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { fetcher } from '../utils/fetcher';
import { SearchResponse } from '../utils/type';

export type YoutubeSearchType = 'video' | 'playlist' | 'channel';
export type YoutubeOrderType =
  | 'date'
  | 'rating'
  | 'relevance'
  | 'title'
  | 'videoCount'
  | 'viewCount';

interface IFetchProps {
  type: YoutubeSearchType;
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

const fetchYoutubeSearch = <T>(
  {
    q,
    maxResults = 24,
    nextPageToken,
    channelId,
    type,
    order = 'relevance',
  }: IFetchProps,
  options?: IFetchOptions,
) => {
  const searchParams = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    regionCode: 'KR',
    type,
    part: 'snippet',
    maxResults: maxResults.toString(),
    order,
  });

  if (nextPageToken) {
    searchParams.append('pageToken', nextPageToken);
  }

  if (q) {
    searchParams.append('q', q);
  }

  if (channelId) {
    searchParams.append('channelId', channelId);
  }

  return fetcher<T>(
    `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string}/search?${searchParams.toString()}`,
    options,
  );
};

export const fetchSearchVideos = (
  props: Omit<IFetchProps, 'type'>,
  options?: IFetchOptions,
) => {
  return fetchYoutubeSearch<SearchResponse>(
    {
      type: 'video',
      ...props,
    },
    options,
  );
};

export const fetchSearchPlaylist = (
  props: Omit<IFetchProps, 'type'>,
  options?: IFetchOptions,
) => {
  return fetchYoutubeSearch(
    {
      type: 'playlist',
      ...props,
    },
    options,
  );
};

export const fetchSearchChannel = (
  props: Omit<IFetchProps, 'type'>,
  options?: IFetchOptions,
) => {
  return fetchYoutubeSearch(
    {
      type: 'channel',
      ...props,
    },
    options,
  );
};
