import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { IVideoDetail } from './type';
import { clientFetcher, serverFetcher } from './fetcher';

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string;
const apiUrl = process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string;

type YoutubeOrderType =
  | 'date'
  | 'rating'
  | 'relevance'
  | 'title'
  | 'videoCount'
  | 'viewCount';

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

// try {
//   const response = await fetch(baseUrl, options);

//   if (!response.ok) {
//     const errorBody = await response.text();
//     console.error(
//       `Fetch Youtube video is failed : ${response.status} ${response.statusText} - Body: ${errorBody}`,
//     );
//     throw new Error(
//       `Failed to fetch youtube videos : ${response.status} ${response.statusText}`,
//     );
//   }

//   return response;
// } catch (error) {
//   console.log('Fetch videos Error', error);
//   throw error;
// }

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
    key: apiKey,
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

  return fetch(`${apiUrl}/search?${searchParams.toString()}`, options);
};

export const fetchShortVideos = async ({ q }: { q?: string }) => {
  let baseUrl = `${apiUrl}/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=KR&key=${apiKey}`;

  if (q) {
    baseUrl += `&id=${q}`;
  }

  try {
    const response = await fetch(baseUrl);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Fetch Short data failed : ${response.status} ${response.statusText} - Body: ${errorBody}`,
      );

      throw new Error(
        `Fetch Short data Failed : ${response.status} ${response.statusText}`,
      );
    }

    return response;
  } catch (error) {
    console.log('Fetch Shorts Error', error);
  }
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=KR&key=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error(`fetch Short videos failed: ${response.status}`);
  } else {
    return response.json();
  }
};

interface IFetchVideoDetailsProps {
  ids: string[];
}
interface IFetchVideoDetailsResponse {
  items: IVideoDetail[];
}

export const fetchVideoDetails = ({ ids }: IFetchVideoDetailsProps) => {
  const searchParams = new URLSearchParams({ id: ids.join(',') });

  if (typeof window === null) {
    return serverFetcher<IFetchVideoDetailsResponse>(
      `${apiUrl}/videos?${searchParams.toString()}`,
    );
  }
  return clientFetcher<IFetchVideoDetailsResponse>(
    `${apiUrl}/videos?${searchParams.toString()}`,
  );
};

export const fetchChannelDetails = async ({ id }: { id: string }) => {
  console.log(id);
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${id}&key=${apiKey}`,
  );
  if (!response.ok) {
    throw new Error(`failed fetch channel details: ${response.status}`);
  } else {
    return response.json();
  }
};

export const fetchPlaylistDetails = async ({ id }: { id: string }) => {
  const response = await fetch(
    `${apiUrl}/playlistItems?part=snippet&playlistId=${id}&key=${apiKey}`,
  );
  if (!response.ok) {
    throw new Error(`failed fetch playlist details: ${response.status}`);
  } else {
    return response.json();
  }
};

export const fetchCommentList = async ({
  id,
  pageToken,
}: {
  id: string;
  pageToken: string;
}) => {
  let baseUrl = `${apiUrl}/commentThreads?part=snippet&maxResults=12&videoId=${id}&key=${apiKey}`;

  if (pageToken) {
    baseUrl += `&pageToken=${pageToken}`;
  }

  console.log(baseUrl);
  const response = await fetch(baseUrl);

  if (!response.ok) {
    console.error(`comment list Error: ${response.statusText}`);
    throw new Error(`failed fetch comment list: ${response.status}`);
  } else {
    return response;
  }
};
