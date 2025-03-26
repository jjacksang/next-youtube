export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

type IStatistics = {
    commentCount?: string;
    likeCount?: string;
    favoriteCount?: string;
    viewCount: string;
};

export interface Video {
    id: { kind: string; videoId: string };

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
}

export interface IChannel {
    id: {
        kind: string;
        channelId: string;
    };
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
        statistics: IStatistics;
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
        publishTime: string;
        viewCount: string;
        thumbnails: {
            default: Thumbnail;
            high: Thumbnail;
            medium: Thumbnail;
        };
    };
}

export interface IChannelDetail {
    brandingSettings: {
        channel: {
            title: string;
            description: string;
        };
    };
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
