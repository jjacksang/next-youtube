interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface Video {
    type: string;
    channelId: string;
    channelTitle: string;
    channelThumbnail: Thumbnail[];
    description: string;
    lengthText: string;
    publishedText: string;
    richThumbnail: Thumbnail[];
    thumbnail: Thumbnail[];
    title: string;
    videoId: string;
    viewCount: string;
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
