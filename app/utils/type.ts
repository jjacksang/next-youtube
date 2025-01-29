export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface Video {
    id: { videoId: string };
    snippet: {
        channelId: string;
        channelTitle: string;
        description: string;
        publishTime: string;
        thumbnails: {
            default: Thumbnail;
            high: Thumbnail;
            medium: Thumbnail;
        };
        title: string;
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
        uploadDate: string;
        viewCount: string;
        thumbnails: {
            default: Thumbnail;
            high: Thumbnail;
            medium: Thumbnail;
        };
    };
    statistics: {
        commentCount: number;
        likeCount: number;
        viewCount: number;
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

export interface IContentDetails {}
