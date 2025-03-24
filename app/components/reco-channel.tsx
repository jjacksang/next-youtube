import style from "./reco-channel.module.css";

export const RecoChannel = () => {
    return (
        <div className={style.channel__container}>
            <div>
                <span>이미지 섹션</span>
            </div>
            <div>
                <div>
                    <h3>채널이름</h3>
                    <span>채널ID, 구독자 수</span>
                    <span>채널 소개</span>
                </div>
                <button>구독</button>
            </div>
        </div>
    );
};
