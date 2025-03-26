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
                    width={240}
                    height={240}
                    className={style.channel__img}
                />
            </div>
            <div>
                <div>
                    <h3>{channel.snippet.channelTitle}</h3>
                    <span>채널ID, 구독자 수</span>
                    <span>채널 소개</span>
                </div>
                <button>구독</button>
            </div>
        </div>
    );
};
