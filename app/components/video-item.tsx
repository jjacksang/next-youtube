import Link from "next/link";
import style from "./video-item.module.css";
import Image from "next/image";
import { elapsedTime } from "../utils/elapsedTime";
import { Video } from "../utils/type";

interface IVideo {
    video: Video;
}

export default function VideoItem({ video }: IVideo) {
    return (
        <div className={style.container}>
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

            <div className={style.info__content}>
                <h3 className={style.content__title}>{video.snippet.title}</h3>
                <div className={style.content__text}>
                    {/* <img src={video.snippet.thumbnails.default.url} /> */}
                    <span className={style.content__author}>
                        {video.snippet.channelTitle}
                    </span>
                    <span className={style.publishTime}>
                        <div className={style.dot}>•</div>
                        {elapsedTime(video.snippet.publishTime)}
                    </span>
                </div>
            </div>
        </div>
    );
}
