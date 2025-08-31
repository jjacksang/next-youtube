'use client';

import styles from './[shortId]/page.module.css';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShortsPlayer from './[shortId]/shortPlayer';
import { IShortDetail } from '../utils/type';

interface ShortProps {
  items: IShortDetail[];
}

const DummyData: ShortProps = {
  items: [
    {
      id: 'test',
      snippet: {
        channelId: 'test-channelId',
        channelTitle: 'test-channel-title',
        description: 'test-description',
        publishedAt: '2025-08-16',
        title: 'test-title',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/f-fcFGLfEBQ/default.jpg',
            width: 120,
            height: 90,
          },
          high: {
            url: 'https://i.ytimg.com/vi/f-fcFGLfEBQ/hqdefault.jpg',
            width: 480,
            height: 360,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/f-fcFGLfEBQ/mqdefault.jpg',
            width: 320,
            height: 180,
          },
        },
      },
      statistics: {
        likeCount: 25230,
        viewCount: 2031,
        favoriteCount: 0,
        commentCount: 3203,
      },
    },

    {
      id: 'test',
      snippet: {
        channelId: 'test-channelId',
        channelTitle: 'test-channel-title',
        description: 'test-description',
        publishedAt: '2025-08-16',
        title: 'test-title',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/f-fcFGLfEBQ/default.jpg',
            width: 120,
            height: 90,
          },
          high: {
            url: 'https://i.ytimg.com/vi/f-fcFGLfEBQ/hqdefault.jpg',
            width: 480,
            height: 360,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/f-fcFGLfEBQ/mqdefault.jpg',
            width: 320,
            height: 180,
          },
        },
      },
      statistics: {
        likeCount: 25230,
        viewCount: 2031,
        favoriteCount: 0,
        commentCount: 3203,
      },
    },
  ],
};

async function fetchShorts() {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=KR&key=' +
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  );
  if (!res.ok) throw new Error('Failed to fetch : Shorts');
  return res.json();
}

export default function ShortsRootPage() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['shorts', 'popular'],
    queryFn: fetchShorts,
    staleTime: 1000 * 60 * 5,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data?.items) return;

    const lastId = localStorage.getItem('lastShortId');

    if (lastId) {
      const idx = data.items.findIndex(
        (item: IShortDetail) => item.id === lastId,
      );
      if (idx !== -1) {
        setCurrentIndex(idx);
        router.replace(`/shorts/${lastId}`);
      }
    }

    if (data?.items[0]?.id) {
      setCurrentIndex(0);
      localStorage.setItem('lastShortId', data.items[0].id);
      router.replace(`/shorts/${data.items[0].id}`);
    }
  }, [data, router]);

  useEffect(() => {
    if (!data?.items?.[currentIndex]) return;

    const currentId = data.items[currentIndex].id;
    localStorage.setItem('lastShortId', currentId);
    router.replace(`/shorts/${currentId}`);
  }, [currentIndex, data, router]);

  return (
    <div className={styles.shorts__wrapper}>
      <div className={styles.shorts__container}>
        <ShortsPlayer
          shorts={DummyData.items}
          shortId={DummyData.items[0].id}
          ownerId={DummyData.items[0].snippet.channelId}
        />
      </div>
    </div>
  );
}
