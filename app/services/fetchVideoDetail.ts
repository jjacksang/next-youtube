import { clientFetcher, serverFetcher } from '../utils/fetcher';
import { IVideoDetail } from '../utils/type';

interface IFetchVideoDetailsProps {
  ids: string[];
}
interface IFetchVideoDetailsResponse {
  items: IVideoDetail[];
}

export const fetchVideoDetails = ({ ids }: IFetchVideoDetailsProps) => {
  const searchParams = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    id: ids.join(','),
    part: 'snippet, statistics',
  });

  if (typeof window === null) {
    return serverFetcher<IFetchVideoDetailsResponse>(
      `${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string}/videos?${searchParams.toString()}`,
    );
  }
  return clientFetcher<IFetchVideoDetailsResponse>(
    `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string}/videos?${searchParams.toString()}`,
  );
};
