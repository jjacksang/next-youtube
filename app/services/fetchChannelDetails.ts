import { clientFetcher, serverFetcher } from '../utils/fetcher';
import { IChannelDetail } from '../utils/type';

interface IChannelDetailsProps {
  ids: string[];
}

interface IFetchChannelDetailsResponse {
  items: IChannelDetail[];
}

export const fetchChannelDetails = async ({ ids }: IChannelDetailsProps) => {
  const searchParams = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    id: ids.join(','),
    part: 'snippet&statistics',
  });

  if (typeof window === null) {
    return serverFetcher<IFetchChannelDetailsResponse>(
      `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string}/videos?${searchParams.toString()}`,
    );
  }

  return clientFetcher<IFetchChannelDetailsResponse>(
    `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/channels?${searchParams.toString()}`,
  );
};
