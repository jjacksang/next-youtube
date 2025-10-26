import { fetcher } from '../utils/fetcher';
import { IChannelDetail } from '../utils/type';

// channel Detail의 경우 id값이 여러 개 들어가도 중복이 있으면 한개만 반환함

interface IChannelDetailsProps {
  channelIds: string[];
}

interface IFetchChannelDetailsResponse {
  items: IChannelDetail[];
}

export const fetchChannelDetails = async ({
  channelIds,
}: IChannelDetailsProps) => {
  const searchParams = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    id: channelIds.join(','),
    part: 'snippet,statistics',
  });

  if (typeof window === null) {
    return fetcher<IFetchChannelDetailsResponse>(
      `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string}/videos?${searchParams.toString()}`,
    );
  }

  return fetcher<IFetchChannelDetailsResponse>(
    `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/channels?${searchParams.toString()}`,
  );
};
