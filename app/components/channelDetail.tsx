import Image from "next/image";
import style from "./channelDetail.module.css";
import { IChannelDetail } from "../utils/type";
import { formatNumber } from "../utils/formatNumber";

export const ChannelDetail = async ({ channelId }: { channelId: string }) => {
    const channelInfo: IChannelDetail = await fetchChannelDetail(
        channelId
    ).then((data) => data.items[0]);

    console.log(channelInfo);

    return (
        <div className={style.channel}>
            <section className={style.channel__section}>
                <div className={style.channel__info}>
                    <Image
                        alt={channelInfo.snippet.description}
                        src={channelInfo.snippet.thumbnails.medium.url}
                        height={channelInfo.snippet.thumbnails.medium.height}
                        width={channelInfo.snippet.thumbnails.medium.width}
                    />
                    <div className={style.channel__text}>
                        <h2>{channelInfo.brandingSettings.channel.title}</h2>
                        <div className={style.channel__statistics}>
                            <span>
                                {channelInfo.snippet.customUrl}
                                {" • "}
                                구독자{" "}
                                {formatNumber(
                                    channelInfo.statistics.subscriberCount
                                )}
                                {" • "}
                                동영상{" "}
                                {formatNumber(
                                    channelInfo.statistics.videoCount
                                )}
                            </span>
                        </div>
                        <div className={style.channel__description}>
                            {channelInfo.snippet.description}
                        </div>
                    </div>
                </div>
            </section>
            <div className={style.tabBar}>
                <div>홈</div>
                <div>동영상</div>
                <div>재생목록</div>
                <div>커뮤니티</div>
                <form>
                    <Image
                        src="/search.svg"
                        alt="search"
                        width={24}
                        height={24}
                    />
                </form>
            </div>
        </div>
    );
};
