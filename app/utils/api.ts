import { RequestInit } from "next/dist/server/web/spec-extension/request";

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string;
const apiUrl = process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string;

interface IfetchProps {
    q: string;
    maxResults: number;
    nextPageToken?: string;
}

interface IFetchOptions extends RequestInit {
    cache?: RequestCache;
    next?: {
        revalidate?: number;
        tags?: string[];
    };
}

export const fetchYoutubeVideos = async (
    { q, maxResults, nextPageToken }: IfetchProps,
    options?: IFetchOptions
) => {
    let baseUrl = `${apiUrl}/search?part=snippet&order=date&maxResults=${maxResults}&q=${q}&key=${apiKey}`;

    if (nextPageToken) {
        baseUrl += `&pageToken=${nextPageToken}`;
    }

    console.log(baseUrl);
    try {
        const response = await fetch(baseUrl, options);

        if (response.ok) return response.json();
    } catch (error) {
        console.log("Fetch videos Error", error);
    }
};

export const fetchVideoDetails = async ({ id }: { id: string }) => {
    const response = await fetch(
        `${apiUrl}/videos?part=snippet%2Cstatistics&id=${id}&key=${apiKey}`
    );

    if (response.ok) return response.json();
};

export const fetchChannelDetails = async ({ id }: { id: string }) => {
    console.log(id);
    const response = await fetch(
        `${apiUrl}/channels?part=snippet%2Cstatistics&id=${id}&key=${apiKey}`
    );
    if (response.ok) return response.json();
};
