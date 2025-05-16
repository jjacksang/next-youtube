import style from "./skeleton-search.module.css";

export const SkeletonSearch = () => {
    return (
        <div className={style.container}>
            <div className={style.thumbnail__img}></div>
            <div className={style.info__container}>
                <div className={style.channel__img}></div>
                <div className={style.info__content}>
                    <div className={style.content__area}>
                        <div className={style.preview__info}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
