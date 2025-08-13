import styles from './page.module.css';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ShortsPlayer from './shortPlayer';

interface Props {
  params: Promise<{ shortId: string }>;
}

async function getShortVideos(shortId: string) {
  console.log(shortId);
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=KR&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) throw new Error('Short not found');
    return response.json();
  } catch (error) {
    console.error('getShortVideos Error!', error);
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shortId } = await params;

  try {
    const short = await getShortVideos(shortId);

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
  const { shortId } = await params;
  console.log(shortId);
  try {
    const short = await getShortVideos(shortId);
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

    // redirect('/shorts');
  }
}
