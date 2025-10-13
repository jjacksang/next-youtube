interface ICommentListProps {
  id: string;
  pageToken?: string;
  maxResults: number;
  order: string;
}

export const fetchCommentList = async ({
  id,
  pageToken,
  maxResults = 12,
  order = 'date',
}: ICommentListProps) => {
  const searchParams = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    part: 'snippet',
    maxResults: maxResults.toString(),
    id,
    order,
  });

  if (pageToken) {
    searchParams.append('pageToken', pageToken);
  }

  return fetch(
    `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/commentThreads?${searchParams.toString()}`,
  );
};
