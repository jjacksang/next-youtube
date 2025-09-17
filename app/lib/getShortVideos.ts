// import { cache } from 'react';

// export const getShortVideos = cache(async (shortId: string) => {
//   const response = await fetch(
//     `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=KR&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
//     {
//       next: { revalidate: 300 },
//     },
//   );

//   if (!response.ok) throw new Error('Short not found');
//   return response.json();
// });
