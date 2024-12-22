import style from "./page.module.css";

export default function Search() {
    return (
        <div>
            <Content />
            <Content />
            <Content />
        </div>
    );
}

export function Content() {
    return (
        <div className={style.container}>
            <div>navigation</div>
            <div className={style.thumbnail__img}>
                <img
                    alt=""
                    src="https://i.ytimg.com/vi/LY3lQ-sOT1E/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLCb1M9B23bf3wldGnnWBN1r04y2nw"
                />
            </div>

            <div className={style.info__content}>
                <h3>와... 이건 진짜 영화다</h3>
                <span>우주하마</span>
                <span>조회수 13만회 / 2일 전</span>
            </div>
        </div>
    );
}
