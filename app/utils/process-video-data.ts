import {
  fetchChannelDetails,
  fetchPlaylistDetails,
  fetchVideoDetails,
} from './api';
import {
  IChannel,
  IChannelDetail,
  IEnrichedVideo,
  PlayList,
  Video,
} from './type';

type SearchResultItem = Video | PlayList | IChannel;

interface YoutubeResponse {
  items: SearchResultItem[];
  nextPageToken?: string;
}

export async function processVideoData(searchResults: YoutubeResponse) {
  // searchResults에 대한 상세정보를 통해 viewCount를 받아와
  // VideoItem컴포넌트에 전달
  console.log('searchResults!!', searchResults);

  try {
    const isVideos = (item: SearchResultItem): item is Video | PlayList => {
      return (
        (item.id?.kind === 'youtube#video' && 'videoId' in item.id) ||
        (item.id?.kind === 'youtube#playlist' && 'playlistId' in item.id)
      );
    };
    const isChannel = (item: SearchResultItem): item is IChannel =>
      item.id?.kind === 'youtube#channel' && 'channelId' in item.id;

    const videoItems = searchResults.items.filter(isVideos);
    const channelItem = searchResults.items.filter(isChannel);
    console.log('video Items', videoItems);
    console.log('channel data : ', channelItem);
    console.log('process-video-data', searchResults.nextPageToken);

    let processedVideoViewCount: IEnrichedVideo[] = [];
    if (videoItems.length > 0) {
      const videoViewCountPromises = videoItems.map(
        (item: Video | PlayList) => {
          try {
            if (item.id.kind === 'youtube#video' && 'videoId' in item.id) {
              console.log(`item중 video항목이 있습니다 ${item}`);
              return fetchVideoDetails({ id: item.id.videoId });
            } else if (
              item.id.kind === 'youtube#playlist' &&
              'playlist' in item.id
            ) {
              console.log(`item중 playlist 항목이 있습니다 ${item}`);
              return fetchPlaylistDetails({
                id: item.id.playlistId,
              });
            }
          } catch (error) {
            console.error(
              `videoViewCountPromises / Error fetching videoDetails ${item.id}: `,
              error,
            );
            return { items: { viewCount: '0' } };
          }
        },
      );
      const videoViewCount = await Promise.all(videoViewCountPromises);

      const uniqueChannelIds = [
        ...new Set(videoItems.map(item => item.snippet.channelId)),
      ];
      let channelThumbnails: Record<string, string> = {};
      if (uniqueChannelIds.length > 0) {
        try {
          const channelDetails = await fetchChannelDetails({
            id: uniqueChannelIds.join(','), // 여러 채널 ID를 쉼표로 구분
          });

          channelThumbnails = channelDetails.items.reduce(
            (acc: Record<string, string>, channel: IChannelDetail) => {
              acc[channel.id] = channel.snippet.thumbnails.default.url;
              return acc;
            },
            {} as Record<string, string>,
          );
          console.log(channelThumbnails);
        } catch (error) {
          console.error('Error fetching channel details/thumbnail: ', error);
        }
      }

      processedVideoViewCount = videoItems.map((item, idx) => {
        const viewCount =
          videoViewCount[idx]?.items?.[0].statistics?.viewCount ?? '0';
        const channelThumbnail =
          channelThumbnails[item.snippet.channelId] || '';

        // Video, PlayList 타입을 IEnrichedVideo로 변환
        return {
          ...item,
          viewCount: parseInt(viewCount),
          snippet: {
            ...item.snippet,
            channelThumbnail,
          },
          //  id 속성 보정
          id:
            'videoId' in item.id
              ? item.id
              : {
                  kind: 'youtube#video',
                  videoId: `${item.id.playlistId}`,
                },
        } as IEnrichedVideo;
      });

      console.log(processedVideoViewCount);
    }

    const combinedItems: (IEnrichedVideo | IChannel)[] = [
      ...processedVideoViewCount,
      ...channelItem,
    ];

    return {
      videoWithViewCount: combinedItems,
      nextPageToken: searchResults.nextPageToken || '',
    };
  } catch (error) {
    console.error('Error in processVideoData: ', error);

    return {
      videoWithViewCount: [],
      nextPageToken: searchResults.nextPageToken || '',
    };
  }
}
