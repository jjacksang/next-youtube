import style from "./commentList.module.css";

import { ICommentList } from "../utils/type";
import { elapsedTime } from "../utils/elapsedTime";
import Link from "next/link";

export const CommentList = ({ comments }: { comments: ICommentList[] }) => {
    console.log("CommnetList component!!", comments);

    return (
        <>
            {comments.map((item: ICommentList) => (
                <div className={style.comment__container} key={item.etag}>
                    <div>
                        <Link
                            href={`/channel/${item.snippet.topLevelComment.snippet.authorChannelId.value}`}
                            className={style.author__img}
                        >
                            <img
                                src={
                                    item.snippet.topLevelComment.snippet
                                        .authorProfileImageUrl
                                }
                                alt={
                                    item.snippet.topLevelComment.snippet
                                        .authorChannelId.value
                                }
                            />
                        </Link>
                    </div>
                    <div className={style.main__container}>
                        <Link
                            href={
                                item.snippet.topLevelComment.snippet
                                    .authorChannelUrl
                            }
                            className={style.author}
                        >
                            <span className={style.author__comment}>
                                {
                                    item.snippet.topLevelComment.snippet
                                        .authorDisplayName
                                }
                            </span>
                            <span className={style.publishTime}>
                                {elapsedTime(
                                    item.snippet.topLevelComment.snippet
                                        .publishedAt
                                )}
                            </span>
                        </Link>

                        <div className={style.comment}>
                            <span>
                                {
                                    item.snippet.topLevelComment.snippet
                                        .textDisplay
                                }
                            </span>
                        </div>
                        <div className={style.comment__icon}>
                            {item.snippet.topLevelComment.snippet.likeCount}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
