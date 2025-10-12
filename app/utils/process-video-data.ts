import { fetchChannelDetails, fetchVideoDetails } from './api';
import {
  IChannel,
  IChannelDetail,
  IEnrichedPlaylist,
  IEnrichedVideo,
  IVideoDetail,
  Playlist,
  Video,
} from './type';

type SearchResultItem = Video | Playlist | IChannel;

interface YoutubeResponse {
  items: SearchResultItem[];
  nextPageToken?: string;
}

function getFulfilledItems<T>(
  result: PromiseSettledResult<{ items: T[] | undefined }>,
): T[] {
  if (
    result.status === 'fulfilled' &&
    result.value &&
    result.value.items &&
    Array.isArray(result.value.items)
  ) {
    return result.value.items;
  }
  return [];
}

/**
 * 1. search 요청
 * 2. videoDetails 가져와서 viewCount, img
 */
export async function processVideoData(
  searchResults: YoutubeResponse,
): Promise<{
  videoWithViewCount: (IEnrichedVideo | IEnrichedPlaylist | IChannel)[];
  nextPageToken: string;
}> {
  // searchResults에 대한 상세정보를 통해 viewCount를 받아와
  // VideoItem컴포넌트에 전달
  console.log('searchResults!!', searchResults);
  console.log(searchResults.items[0].snippet);

  try {
    // item.id.kind 에 따라 각 데이터 수집

    // const isPlaylist = (item: SearchResultItem): item is Playlist =>
    //   item.id?.kind === 'youtube#playlist' &&
    //   typeof item.id.playlistId === 'string';

    // const isChannel = (item: SearchResultItem): item is IChannel =>
    //   item.id?.kind === 'youtube#channel' &&
    //   typeof item.snippet.channelId === 'string'

    // const videoItems = searchResults.items.filter(isVideos);
    // const playlistItems = searchResults.items.filter(isPlaylist);
    // const channelItems = searchResults.items.filter(isChannel);

    // 각 데이터에 따라 id값 맵핑
    // const videoIds = [...new Set(videoItems.map(item => item.id.videoId))];
    // const channelIds = [
    //   ...new Set(channelItems.map(item => item.snippet.channelId)),
    // ];
    // const channelIdsFromAllItems = [
    //   ...videoItems.map(item => item.snippet.channelId),
    //   ...playlistItems.map(item => item.snippet.channelId),
    // ];

    // channel thumbnail을 가져오기 위해 videos, playlists 에 각 channelId 수집
    // const uniqueChannelIds = [
    //   ...new Set(channelIdsFromAllItems.filter(Boolean)),
    // ];

    // // quota cost를 고려하여 최소 요청으로 줄이기 위해 병렬 배치
    // // 만약 해당 id값이 없을땐 빈 배열 반환
    // const videoDetailsPromise =
    //   videoIds.length > 0
    //     ? fetchVideoDetails({ id: videoIds.join(',') })
    //     : Promise.resolve({ items: [] });

    // const channelDetailsPromise =
    //   channelIds.length > 0
    //     ? fetchChannelDetails({ id: channelIds.join(',') })
    //     : Promise.resolve({ items: [] });

    // // channel thumbnail을 가져오기 위해 요청
    // const channelDetailsFromAllItems =
    //   uniqueChannelIds.length > 0
    //     ? fetchChannelDetails({ id: uniqueChannelIds.join(',') })
    //     : Promise.resolve({ items: [] });

    // // 병렬처리
    // const [videoDetailsResults, channelDetailsResults, eachChannelDetails] =
    //   await Promise.allSettled([
    //     videoDetailsPromise,
    //     channelDetailsPromise,
    //     channelDetailsFromAllItems,
    //   ]);

    // // 실패한 Promise가 있는지 체크
    // if (videoDetailsResults.status === 'rejected') {
    //   console.error(
    //     '❌ Video details fetch failed:',
    //     videoDetailsResults.reason,
    //   );
    // }
    // if (channelDetailsResults.status === 'rejected') {
    //   console.error(
    //     '❌ Channel details fetch failed:',
    //     channelDetailsResults.reason,
    //   );
    // }
    // if (eachChannelDetails.status === 'rejected') {
    //   console.error(
    //     '❌ Channel thumbnails fetch failed:',
    //     eachChannelDetails.reason,
    //   );
    // }

    // // Promise로 반환받은 데이터 평탄화
    // const videoItemsData: IVideoDetail[] =
    //   getFulfilledItems(videoDetailsResults);

    // // const channelItemsData: IChannel[] = getFulfilledItems(
    // //   channelDetailsResults,
    // // );
    // const eachChannelItemData: IChannelDetail[] =
    //   getFulfilledItems(eachChannelDetails);

    // // 빠른 조회를 위해 Mapping
    // const videoDetailsMap = new Map(
    //   videoItemsData.map(video => [video.id, video]),
    // );

    // const channelThumbnailMap = new Map(
    //   eachChannelItemData.map(channel => [
    //     channel.id,
    //     channel.snippet.thumbnails.default.url,
    //   ]),
    // );

    // // 최종 데이터 반환
    // const processedSearchResults: (
    //   | IEnrichedVideo
    //   | IEnrichedPlaylist
    //   | IChannel
    // )[] = searchResults.items
    //   .map(item => {
    //     if (isVideos(item)) {
    //       const videoDetail = videoDetailsMap.get(item.id.videoId);
    //       const channelThumbnail = channelThumbnailMap.get(
    //         item.snippet.channelId,
    //       );

    //       return {
    //         id: { ...item.id },
    //         kind: 'youtube#searchResult',
    //         viewCount: videoDetail?.statistics?.viewCount || 0,
    //         snippet: {
    //           ...item.snippet,
    //           channelThumbnail: channelThumbnail || '',
    //         },
    //       } as IEnrichedVideo;
    //     } else if (isPlaylist(item)) {
    //       const channelThumbnail = channelThumbnailMap.get(
    //         item.snippet.channelId,
    //       );

    //       return {
    //         ...item,
    //         snippet: {
    //           ...item.snippet,
    //           channelThumbnail: channelThumbnail || '',
    //         },
    //       } as IEnrichedPlaylist;
    //     } else if (isChannel(item)) {
    //       return {
    //         ...item,
    //         kind: 'youtube#channel',
    //         id: item.id,
    //         snippet: { ...item.snippet },
    //       } as IChannel;
    //     }

    //     return null;
    //   })
    //   .filter(
    //     (item): item is IEnrichedVideo | IEnrichedPlaylist | IChannel =>
    //       item !== null,
    //   );

    // console.log(processedSearchResults);
    // return {
    //   videoWithViewCount: processedSearchResults,
    //   nextPageToken: searchResults.nextPageToken || '',
    // };

    return {
      videoWithViewCount: [],
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
