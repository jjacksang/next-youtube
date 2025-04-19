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
        kind: "youtube#video";
        videoId: string;
    };
}

export interface PlayList extends YoutubeItem {
    id: {
        kind: "youtube#playlist";
        playlistId: string;
    };
}

export interface IChannel extends YoutubeItem {
    id: {
        kind: "youtube#channel";
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
        viewCount: string;
        videoCount: number;
    };
}

export interface IChannelDetail {
    id: string;
    contentDetails: {
        id: string;
    };
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
}
