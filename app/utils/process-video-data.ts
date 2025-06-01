import {
  fetchChannelDetails,
  fetchPlaylistDetails,
  fetchVideoDetails,
} from './api';
import { IChannel, IEnrichedVideo, PlayList, Video } from './type';

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
    // item.id.kind 에 따라 각 데이터 수집
    const isVideos = (item: SearchResultItem): item is Video =>
      item.id?.kind === 'youtube#video' && typeof item.id.videoId === 'string';
    const isPlaylist = (item: SearchResultItem): item is PlayList =>
      item.id?.kind === 'youtube#playlist' &&
      typeof item.id.playlistId === 'string';
    const isChannel = (item: SearchResultItem): item is IChannel =>
      item.id?.kind === 'youtube#channel' &&
      typeof item.snippet.channelId === 'string';

    const videoItems = searchResults.items.filter(isVideos);
    const playlistItems = searchResults.items.filter(isPlaylist);
    const channelItems = searchResults.items.filter(isChannel);

    // 각 데이터에 따라 id값 맵핑
    let videoIds = [...new Set(videoItems.map(item => item.id.videoId))];
    let playlistIds = [
      ...new Set(playlistItems.map(item => item.id.playlistId)),
    ];
    let channelIds = [
      ...new Set(channelItems.map(item => item.snippet.channelId)),
    ];
    let channelIdsFromAllItems = [
      ...videoItems.map(item => item.snippet.channelId),
      ...playlistItems.map(item => item.snippet.channelId),
    ];

    // channel thumbnail을 가져오기 위해 videos, playlists 에 각 channelId 수집
    const uniqueChannelIds = [
      ...new Set(channelIdsFromAllItems.filter(Boolean)),
    ];

    console.log('ChannelIds Mapping :', uniqueChannelIds);

    // quota cost를 고려하여 최소 요청으로 줄이기 위해 병렬 배치
    // 만약 해당 id값이 없을땐 빈 배열 반환
    const videoDetailsPromise =
      videoIds.length > 0
        ? fetchVideoDetails({ id: videoIds.join(',') })
        : Promise.resolve({ items: [] });
    const playlistDetailsPromise =
      playlistIds.length > 0
        ? fetchPlaylistDetails({ id: playlistIds.join(',') })
        : Promise.resolve({ items: [] });
    const channelDetailsPromise =
      channelIds.length > 0
        ? fetchChannelDetails({ id: channelIds.join(',') })
        : Promise.resolve({ items: [] });

    // channel thumbnail을 가져오기 위해 요청
    const channelDetailsFromAllItems =
      uniqueChannelIds.length > 0
        ? fetchChannelDetails({ id: uniqueChannelIds.join(',') })
        : Promise.resolve({ items: [] });

    const [videoResults, playlistResults, channelResults, eachChannelDetails] =
      await Promise.allSettled([
        videoDetailsPromise,
        playlistDetailsPromise,
        channelDetailsPromise,
        channelDetailsFromAllItems,
      ]);

    console.log('videoDetails :', videoResults);
    console.log('channelDetails :', playlistResults);
    console.log('playlistDetails : ', channelResults);
    console.log('eachChannelDetails', eachChannelDetails);
  } catch (error) {
    console.error('Error in processVideoData: ', error);

    return {
      videoWithViewCount: [],
      nextPageToken: searchResults.nextPageToken || '',
    };
  }
}
