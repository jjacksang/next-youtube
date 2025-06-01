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
  let baseUrl = `${apiUrl}/search?part=snippet&order=date&maxResults=${maxResults}&q=${q}&key=${apiKey}`;

  if (nextPageToken) {
    baseUrl += `&pageToken=${nextPageToken}`;
  }

  try {
    const response = await fetch(baseUrl, options);

    if (response.ok) return response.json();
  } catch (error) {
    console.log('Fetch videos Error', error);
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
  const response = await fetch(
    `${apiUrl}/channels?part=snippet%2CtopicDetails%2Cstatistics&id=${id}&key=${apiKey}`,
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
