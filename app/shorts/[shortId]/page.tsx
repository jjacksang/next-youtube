import styles from '../page.module.css';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ShortsPlayer from './shortPlayer';

interface Props {
  params: { shortId: string };
}

async function getShortVideos(shortId: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=KR&id=${shortId || ''}`,
    {
      next: { revalidate: 300 },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      },
    },
  );

  if (!response.ok) throw new Error('Short not found');
  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const short = await getShortVideos(params.shortId);

    return {
      title: `${short.items[0].title} - Youtube Shorts`,
      description: short.items[0].description,
      openGraph: {
        title: short.items[0].snippet.title,
        description: short.items[0].snippet.description,
        images: [
          {
            url: short.items[0].snippet.thumbnails.default.url,
            width: 720,
            height: 720,
          },
        ],
        videos: [
          { url: `https://www.youtube.com/watch?v=${short.items[0].id}` },
        ],
        type: 'video.other',
      },
    };
  } catch (error) {
    return {
      title: 'Short Not Found',
      description: 'The requested short video could not be found',
    };
  }
}

export default async function Page({ params }: Props) {
  try {
    const short = await getShortVideos(params.shortId);
    console.log('shorts page!!');
    console.log(short);

    return (
      <div className={styles.shorts__wrapper}>
        <div className={styles.shorts__container}>
          <ShortsPlayer shorts={short.items} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in shorts page: ', error);

    redirect('/shorts');
  }
}
