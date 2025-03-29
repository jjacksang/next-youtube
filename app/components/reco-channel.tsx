import Image from "next/image";
import { IChannel } from "../utils/type";
import style from "./reco-channel.module.css";

interface RecoChannelProps {
    channel: IChannel;
}

export const RecoChannel = ({ channel }: RecoChannelProps) => {
    console.log("reco-channel >>> ", channel);
    return (
        <div className={style.channel__container}>
            <div className={style.channel__thumbnail}>
                <Image
                    src={channel.snippet.thumbnails.high.url}
                    alt={channel.snippet.description}
                    width={180}
                    height={180}
                    className={style.channel__img}
                />
            </div>
            <div className={style.channel__info}>
                <div className={style.channel__text}>
                    <h2>{channel.snippet.channelTitle}</h2>
                    <span></span>
                    <span>{channel.snippet.description}</span>
                </div>
                <div className={style.subscribe__button}>
                    <button>구독</button>
                </div>
            </div>
        </div>
    );
};
