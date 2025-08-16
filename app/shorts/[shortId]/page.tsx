import styles from './page.module.css';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ShortsPlayer from './shortPlayer';
import { getShortVideos } from '@/app/lib/getShortVideos';
import { IShortDetail } from '@/app/utils/type';

interface Props {
  params: Promise<{ shortId: string }>;
}

interface ShortProps {
  items: IShortDetail[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shortId } = await params;

  try {
    const short = await getShortVideos(shortId);
    console.log(short);

    return {
      title: `${short.items[0].snippet.title} - Youtube Shorts`,
      description: short.items[0].snippet.description,
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
    const short: ShortProps = await getShortVideos(shortId);
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
