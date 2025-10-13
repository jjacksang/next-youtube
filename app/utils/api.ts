const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string;
const apiUrl = process.env.NEXT_PUBLIC_YOUTUBE_API_URL as string;

// try {
//   const response = await fetch(baseUrl, options);

//   if (!response.ok) {
//     const errorBody = await response.text();
//     console.error(
//       `Fetch Youtube video is failed : ${response.status} ${response.statusText} - Body: ${errorBody}`,
//     );
//     throw new Error(
//       `Failed to fetch youtube videos : ${response.status} ${response.statusText}`,
//     );
//   }

//   return response;
// } catch (error) {
//   console.log('Fetch videos Error', error);
//   throw error;
// }
