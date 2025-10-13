import { clientFetcher, serverFetcher } from '../utils/fetcher';
import { IEnrichedPlaylist } from '../utils/type';

interface IPlaylistDetailsProps {
  ids: string[];
}

interface IPlaylistDetailsResponse {
  items: IEnrichedPlaylist[];
}

export const fetchPlaylistDetails = async ({ ids }: IPlaylistDetailsProps) => {
  const searchParams = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    part: 'snippet',
    id: ids.join(','),
  });

  if (typeof window === null) {
    return serverFetcher<IPlaylistDetailsResponse>(
      `${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string}/playlistItems?${searchParams.toString()}`,
    );
  }
  return clientFetcher<IPlaylistDetailsResponse>(
    `${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string}/playlistItems?${searchParams.toString()}`,
  );
};
