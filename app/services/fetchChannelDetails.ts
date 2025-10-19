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
    id: ids.join(','),
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
