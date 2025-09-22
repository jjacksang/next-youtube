import { ReactNode } from 'react';

import style from './layout.module.css';
import { ChannelDetail } from '@/app/components/channel/channelDetail';

export default async function ChannelLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id);
  return (
    <div className={style.container}>
      <ChannelDetail channelId={id} />
      <main>{children}</main>
    </div>
  );
}
