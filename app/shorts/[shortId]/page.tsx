'use client';

import styles from './page.module.css';

import { redirect, useParams } from 'next/navigation';
import ShortsPlayer from './shortPlayer';
import { IShortDetail } from '@/app/utils/type';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { GrFormPreviousLink } from 'react-icons/gr';

async function fetchParamsShorts({ shortId }: { shortId: string }) {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${shortId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
  );

  if (!res.ok) throw new Error(`Can't find ${shortId}`);
  const data = await res.json();
  const hitData = data[0];
  return hitData;
}

async function fetchShorts() {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=KR&key=' +
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  );
  if (!res.ok) throw new Error('Failed to fetch : Shorts');
  console.log(res.json());
  return res.json();
}

export default function Page() {
  const { shortId } = useParams<{ shortId: string }>();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);

  const queryFunc = shortId
    ? () => fetchParamsShorts({ shortId })
    : () => fetchShorts();

  console.log(shortId);

  const { data } = useQuery({
    queryKey: ['shorts', 'popular'],
    queryFn: queryFunc,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!data?.items) return;

    if (shortId) {
      const idx = data.items.findIndex(
        (item: IShortDetail) => item.id === shortId,
      );
      setCurrentIndex(idx !== -1 ? idx : 0);
    } else {
      const lastId = localStorage.getItem('lastShortId');
      const idx = data.items.findIndex(
        (item: IShortDetail) => item.id === lastId,
      );
      setCurrentIndex(idx !== -1 ? idx : 0);
    }
  }, [data?.items, shortId]);

  useEffect(() => {
    if (currentIndex === null || !data?.items) return;
    const currentId = data.items[currentIndex].id;

    localStorage.setItem('lastShortId', currentId);
    router.replace(`/shorts/${currentId}`);
  }, [currentIndex, data, router]);

  const handleNext = () => {
    if (!data?.items || currentIndex === null) return;
    console.log('handleNext Click');
    setCurrentIndex(prev => Math.min((prev ?? 0) + 1, data.items.length - 1));
  };

  const handlePrev = () => {
    console.log('handlePrev Click');
    setCurrentIndex(prev => Math.max((prev ?? 0) - 1, 0));
  };

  if (!data?.items || currentIndex === null) return <div></div>;
  try {
    return (
      <div className={styles.shorts__wrapper}>
        <div className={styles.shorts__container}>
          <ShortsPlayer shorts={data.items[currentIndex]} />
        </div>
        <div className={styles.shorts__controls}>
          <button type="button" className={styles.prev} onClick={handlePrev}>
            <GrFormPreviousLink
              style={{ transform: 'rotate(90deg)', width: 36, height: 36 }}
            />
          </button>
          <button type="button" className={styles.next} onClick={handleNext}>
            <GrFormPreviousLink
              style={{ transform: 'rotate(270deg)', width: 36, height: 36 }}
            />
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in shorts page: ', error);

    redirect('/shorts');
  }
}
