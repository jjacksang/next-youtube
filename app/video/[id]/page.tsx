import { fetchChannelDetails, fetchVideoDetails } from '@/app/utils/api';
import ClientWrapper from './clientWrapper';
import { parseJson } from '@/app/utils/fetcher';

export function generateMetadata() {
  return {
    title: ``,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);

  const response = await fetchVideoDetails({ ids: [id] });
  const videoDetails = await parseJson(response);

  const channelDetails = await fetchChannelDetails({
    id: videoDetails.items[0].snippet.channelId,
  });

  const authorChannelId = channelDetails.items[0].id;

  console.log(authorChannelId);

  const channelThumbnail =
    channelDetails.items[0].snippet.thumbnails.default.url;

  return (
    <ClientWrapper
      videoDetails={videoDetails}
      channelThumbnail={channelThumbnail}
      authorChannelId={authorChannelId}
      id={id}
    />
  );
}
