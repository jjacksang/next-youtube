'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  useEffect(() => {
    const lastId = localStorage.getItem('lastShortId');

    if (lastId) {
      router.replace(`/shorts/${lastId}`);
    } else if (data?.items?.[0]?.id) {
      localStorage.setItem('lastShortId', data.items[0].id);
      router.replace(`/shorts/${data.items[0].id}`);
    }
  }, [data, router]);

  return <p>Loading Shorts...</p>;
}
