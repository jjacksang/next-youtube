const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string;
const apiUrl = process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string;

interface IfetchProps {
    q: string;
    maxResults: number;
    nextPageToken?: string;
}

export const fetchYoutubeVideos = async ({
    q,
    maxResults,
    nextPageToken,
}: IfetchProps) => {
    let baseUrl = `${apiUrl}/search?part=snippet&order=date&maxResults=${maxResults}&q=${q}&key=${apiKey}`;

    if (nextPageToken) {
        baseUrl += `&pageToken=${nextPageToken}`;
    }

    console.log(baseUrl);
    try {
        const response = await fetch(baseUrl);

        if (response.ok) return response.json();
    } catch (error) {
        console.log("Fetch videos Error", error);
    }
};
