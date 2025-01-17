const baseURL = process.env.NEXT_PUBLIC_RAPID_API_URL as string;
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
};

export const fetchYoutubeVideos = async (q: string) => {
    try {
        const response = await fetch(
            `${baseURL}/search?q=${q}&part=snippet&maxResults=24&order=date`,
            options
        );
        if (!response.ok) console.log("fetch Search failed");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const fetchVideoDetail = async (id: string) => {
    try {
        const response = await fetch(`${baseURL}/video?id=${id}`, options);
        if (!response.ok) console.log("fetch VideoDetail failed");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};
