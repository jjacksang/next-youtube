import { fetchChannelDetails, fetchVideoDetails } from '@/app/utils/api';
import ClientWrapper from './clientWrapper';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);

  const videoDetails = await fetchVideoDetails({ id });
  console.log(videoDetails);

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
