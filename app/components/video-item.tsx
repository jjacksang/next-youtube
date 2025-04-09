import Link from "next/link";
import style from "./video-item.module.css";
import Image from "next/image";
import { elapsedTime } from "../utils/elapsedTime";
import { IEnrichedVideo } from "../utils/type";
import { formatNumber } from "../utils/formatNumber";

interface VideoItemProps {
    video: IEnrichedVideo;
}

export default function VideoItem({ video }: VideoItemProps) {
    return (
        <div className={style.container} key={video.id.videoId}>
            <div className={style.thumbnail__img}>
                <Link href={`/video/${video.id.videoId}`}>
                    <Image
                        alt="h"
                        width={68}
                        height={68}
                        src={video.snippet.thumbnails.medium.url}
                    />
                </Link>
            </div>
            <div className={style.info__container}>
                <div className={style.channel__img}>
                    <Link href={`/channel/${video.snippet.channelId}`}>
                        <Image
                            src={video.snippet.thumbnails.default.url}
                            alt={video.snippet.description}
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>
                <div className={style.info__content}>
                    <h3 className={style.content__title}>
                        {video.snippet.title}
                    </h3>
                    <div className={style.content__area}>
                        <span className={style.content__author}>
                            {video.snippet.channelTitle}
                        </span>

                        <div className={style.preview__info}>
                            <span>
                                조회수 {formatNumber(video.viewCount)}회
                            </span>
                            <div className={style.dot}>•</div>
                            <span>
                                {elapsedTime(video.snippet.publishTime)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
