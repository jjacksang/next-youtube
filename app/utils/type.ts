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

export interface YoutubeItem {
    kind: string;
    snippet: {
        channelId: string;
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

export interface Video extends YoutubeItem {
    id: {
        kind: "youtube#video";
        videoId: string;
    };
}

export interface IChannel extends YoutubeItem {
    id: {
        kind: "youtube#channel";
        channelId: string;
    };
}

// export interface IChannel {
//     id: {
//         kind: string;
//         channelId: string;
//     };
//     snippet: {
//         channelId: string;
//         channelTitle: string;
//         description: string;
//         publishTime: string;
//         publishedAt: string;
//         thumbnails: {
//             default: Thumbnail;
//             high: Thumbnail;
//             medium: Thumbnail;
//         };
//         title: string;
//         statistics: IStatistics;
//     };
// }

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
