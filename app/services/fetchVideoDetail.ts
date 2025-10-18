import { fetcher } from '../utils/fetcher';
import { IVideoDetail } from '../utils/type';

interface IFetchVideoDetailsProps {
  ids: string[];
}
interface IFetchVideoDetailsResponse {
  kind: 'youtube#videoListResponse';
  etag: string;
  items: IVideoDetail[];
  pageInfo: { totalResults: number; resultsPerPage: number };
}

export const fetchVideoDetails = ({ ids }: IFetchVideoDetailsProps) => {
  const searchParams = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    id: ids.join(','),
    part: 'snippet,statistics',
  });
  const url = `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string}/videos?${searchParams.toString()}`;
  return fetcher<IFetchVideoDetailsResponse>(url);
};
