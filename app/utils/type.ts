export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeItem {
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: Thumbnail;
      high: Thumbnail;
      medium: Thumbnail;
    };
    title: string;
  };
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

export interface Video extends YoutubeItem {
  id: {
    kind: 'youtube#video';
    videoId: string;
  };
}

export interface PlayList extends YoutubeItem {
  id: {
    kind: 'youtube#playlist';
    playlistId: string;
  };
}

export interface IChannel extends YoutubeItem {
  id: {
    kind: 'youtube#channel';
    channelId: string;
  };
}

export interface IVideoDetail {
  id: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    title: string;
    thumbnails: {
      default: Thumbnail;
      high: Thumbnail;
      medium: Thumbnail;
    };
  };
  statistics: {
    subscriberCount: number;
    viewCount: number;
    videoCount: number;
  };
}

export interface IChannelDetail {
  id: string;
  kind: 'youtube#channel';
  snippet: {
    customUrl: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      high: Thumbnail;
      medium: Thumbnail;
    };
    publishedAt: string;
    title: string;
  };

  statistics: {
    subscriberCount: number;
    viewCount: number;
    videoCount: number;
  };
}

export interface IEnrichedVideo extends Video {
  viewCount: number;
  snippet: Video['snippet'] & {
    channelThumbnail: string | null;
  };
}

export interface ICommentList {
  id: string;
  etag: string;
  snippet: {
    canReply: boolean;
    channelId: string;
    isPublic: boolean;
    topLevelComment: {
      id: string;
      snippet: {
        authorChannelId: {
          value: string;
        };
        authorChannelUrl: string;
        authorDisplayName: string;
        authorProfileImageUrl: string;
        channelId: string;
        likeCount: number;
        publishedAt: string;
        textDisplay: string;
        textOriginal: string;
        updateAt: string;
        videoId: string;
      };
    };
    totalReplyCount: number;
    videoId: string;
  };
}
