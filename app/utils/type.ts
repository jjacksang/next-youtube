interface Thumbnail {
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
    channelId: string;
    channelTitle: string;
    description: string;
    publishDate: string;
    title: string;
    uploadDate: string;
    viewCount: string;
    thumbnail: Thumbnail[];
}
