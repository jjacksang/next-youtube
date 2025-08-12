import { RequestInit } from 'next/dist/server/web/spec-extension/request';

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string;
const apiUrl = process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string;

interface IfetchProps {
  q: string;
  maxResults: number;
  nextPageToken?: string;
}

interface IFetchOptions extends RequestInit {
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

export const fetchYoutubeVideos = async (
  { q, maxResults, nextPageToken }: IfetchProps,
  options?: IFetchOptions,
) => {
  console.log('fetchYoutubeVideos Params :', q, maxResults, nextPageToken);

  let baseUrl = `${apiUrl}/search?part=snippet&order=date&regionCode=KR&maxResults=${maxResults}&q=${q}&key=${apiKey}`;

  if (nextPageToken) {
    baseUrl += `&pageToken=${nextPageToken}`;
  }

  try {
    const response = await fetch(baseUrl, options);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Fetch Youtube video is failed : ${response.status} ${response.statusText} - Body: ${errorBody}`,
      );
      throw new Error(
        `Failed to fetch youtube videos : ${response.status} ${response.statusText}`,
      );
    }

    return response;
  } catch (error) {
    console.log('Fetch videos Error', error);
    throw error;
  }
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

export const fetchVideoDetails = async ({ id }: { id: string }) => {
  const response = await fetch(
    `${apiUrl}/videos?part=snippet%2Cstatistics&id=${id}&key=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error(`Failed fetch video details: ${response.status}`);
  } else {
    return response.json();
  }
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
    return response.json();
  }
};
