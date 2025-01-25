import Image from "next/image";
import { fetchChannelDetail } from "../utils/api";
import style from "./channelDetail.module.css";

export const ChannelDetail = async ({ channelId }: { channelId: string }) => {
    const res = await fetchChannelDetail(channelId).then(
        (data) => data.items[0]
    );

    console.log(res);
    return (
        <div className={style.channel}>
            <section className={style.channel__section}>
                <div className={style.channel__info}>
                    <Image
                        alt={res.snippet.description}
                        src={res.snippet.thumbnails.medium.url}
                        height={res.snippet.thumbnails.medium.height}
                        width={res.snippet.thumbnails.medium.width}
                    />
                    <div className={style.channel__text}>
                        <h2>{res.brandingSettings.channel.title}</h2>
                        <span className={style.channel__statistics}>
                            channel statistics
                        </span>
                        <span className={style.channel__description}>
                            channel description
                        </span>
                    </div>
                </div>
            </section>
            <div className={style.tabBar}>
                <div>홈</div>
                <div>동영상</div>
                <div>재생목록</div>
                <div>커뮤니티</div>
            </div>
        </div>
    );
};
