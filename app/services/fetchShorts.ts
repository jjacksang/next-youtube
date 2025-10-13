import { YoutubeOrderType } from '../utils/type';

interface IShortVideosProps {
  q?: string;
  order?: YoutubeOrderType;
  maxResults?: number;
  channelId?: string;
  nextPageToken?: string;
}

export const fetchShortVideos = async ({
  q,
  maxResults = 24,
  nextPageToken,
  order = 'date',
}: IShortVideosProps) => {
  const searchParams = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    regionCode: 'KR',
    part: 'snippet&statistics',
    maxResults: maxResults.toString(),
    order,
  });

  if (nextPageToken) {
    searchParams.append('nextPageToken', nextPageToken);
  }

  if (q) {
    searchParams.append('q', q);
  }

  return fetch(
    `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/videos?${searchParams.toString()}`,
  );
};
