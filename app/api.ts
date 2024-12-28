// const options = {
//     params: {
//         part: "snippet",
//         maxResults: 48,
//         order: "date",
//     },
//     headers: {
//         "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
//         "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
//     },
// };

// export const fetchYoutubeSearch = async (q: string) => {
//     try {
//         const res = await fetch(
//             `${process.env.NEXT_PUBLIC_RAPID_API_URL}/search?${q}`
//         );
//         console.log("in api file", res);
//     } catch (error) {
//         console.error("Errrrrrrrrr");
//         throw error;
//     }
// };

export const fetchYoutubeVideos = async (q: string) => {
    const url = process.env.NEXT_PUBLIC_RAPID_API_URL;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
            "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(
            `${url}/search?=${q}&?part=snippet&maxResults=48`,
            options
        );
        if (!response.ok) console.log("fetch failed");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
