'use client';

import styles from './page.module.css';

import { redirect } from 'next/navigation';
import ShortsPlayer from './shortPlayer';
import { IShortDetail } from '@/app/utils/type';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

interface Props {
  params: Promise<{ shortId: string }>;
}

interface ShortProps {
  items: IShortDetail[];
}

async function fetchShorts() {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=KR&key=' +
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  );
  if (!res.ok) throw new Error('Failed to fetch : Shorts');
  return res.json();
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { shortId } = await params;

//   try {
//     const short = await getShortVideos(shortId);

//     return {
//       title: `${short.items[0].snippet.title} - Youtube Shorts`,
//       description: short.items[0].snippet.description,
//       openGraph: {
//         title: short.items[0].snippet.title,
//         description: short.items[0].snippet.description,
//         images: [
//           {
//             url: short.items[0].snippet.thumbnails.default.url,
//             width: 720,
//             height: 720,
//           },
//         ],
//         videos: [
//           { url: `https://www.youtube.com/watch?v=${short.items[0].id}` },
//         ],
//         type: 'video.other',
//       },
//     };
//   } catch (error) {
//     return {
//       title: 'Short Not Found',
//       description: 'The requested short video could not be found',
//     };
//   }
// }

export default function Page({ params }: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ['shorts', 'popular'],
    queryFn: fetchShorts,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!data?.items) return;

    if (currentIndex === null) {
      const lastId = localStorage.getItem('lastShortId');
      const idx = data.items.findIndex(
        (item: IShortDetail) => item.id === lastId,
      );
      setCurrentIndex(idx !== -1 ? idx : 0);
    } else {
      const currentId = data.items[currentIndex].id;
      localStorage.setItem('lastShortId', currentId);
      router.replace(`/shorts/${currentId}`);
    }
  }, [currentIndex, data, router]);

  const handleNext = () => {
    if (!data?.items) return;
    console.log('handleNext Click');
    setCurrentIndex(prev => Math.min(prev + 1, data.items.length - 1));
  };

  const handlePrev = () => {
    console.log('handlePrev Click');
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };
  try {
    return (
      <div className={styles.shorts__wrapper}>
        <div className={styles.shorts__container}>
          <ShortsPlayer
            shorts={data.items}
            shortId={data.items[currentIndex].id}
            ownerId={data.items[currentIndex].snippet.channelId}
          />
        </div>
        <div className={styles.shorts__controls}>
          <button type="button" className={styles.next} onClick={handleNext}>
            Up
          </button>
          <button type="button" className={styles.prev} onClick={handlePrev}>
            Down
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in shorts page: ', error);

    redirect('/shorts');
  }
}
