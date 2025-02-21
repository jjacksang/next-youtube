import { Video } from "./type";

const baseURL = process.env.NEXT_PUBLIC_RAPID_API_URL as string;
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
};

interface YoutubeResponse {
    items: Video[];
    nextPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}

interface IFetchVideoParams {
    q: string;
    maxResults: number;
    nextPageToken?: string;
}

export const fetchYoutubeVideos = async ({
    q,
    maxResults,
    nextPageToken,
}: IFetchVideoParams): Promise<YoutubeResponse> => {
    try {
        const response = await fetch(
            `${baseURL}/search?q=${q}&part=snippet&maxResults=${maxResults}&order=date&nextPageToken=${nextPageToken}`,
            options
        );
        if (!response.ok) console.log("fetch Search failed");

        const data: YoutubeResponse = await response.json();

        console.log("res", data);

        const validItems: YoutubeResponse = {
            ...data,
            items: data.items.filter(
                (item: Video) => item && item.id && item.id.videoId
            ),
        };

        console.log(validItems);

        if (validItems.items.length < maxResults && data.nextPageToken) {
            const addResults = await fetchYoutubeVideos({
                q,
                maxResults: maxResults - validItems.items.length,
                nextPageToken: data.nextPageToken,
            });

            console.log(addResults);
            const combinedResults = {
                ...addResults,
                items: [...validItems.items, ...addResults.items],
                pageInfo: {
                    ...data.pageInfo,
                    resultsPerPage:
                        validItems.items.length + addResults.items.length,
                },
            };
            return combinedResults;
        }

        return validItems;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const fetchVideoDetail = async (id: string) => {
    try {
        const response = await fetch(
            `${baseURL}/videos?part=snippet&statistics&id=${id}`,
            options
        );
        if (!response.ok) console.log("fetch VideoDetail failed");
        const data = await response.json();

        return data.items[0];
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};

export const fetchChannelDetail = async (id: string) => {
    try {
        const res = await fetch(
            `${baseURL}/channels?part=snippet&id=${id}`,
            options
        );
        if (res.ok) {
            let data = await res.json();
            console.log(data);

            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchVideoCommnetList = async (id: string) => {
    try {
        const res = await fetch(
            `${baseURL}/commentThreads?part=snippet&videoId=${id}&maxResults=100`,
            options
        );

        if (res.ok) {
            let data = await res.json();
            console.log(data);

            return data;
        }
    } catch (error) {
        console.log("fetch failed commnet list", error);
    }
};

export const fetchChannelVideos = async (id: string) => {
    try {
        const res = await fetch(
            `${baseURL}/search?part=snippet&order=date&maxResults=12&channelId=${id}`,
            options
        );

        if (res.ok) {
            let data = await res.json();

            console.log(data);

            return data;
        }
    } catch (error) {
        console.log("fetch channle videos error: ", error);
    }
};
