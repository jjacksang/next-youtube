import style from "./commentList.module.css";

import { ICommentList } from "../utils/type";
import { elapsedTime } from "../utils/elapsedTime";

type CommentProps = {
    items: ICommentList[];
};

export const CommentList = ({ comments }: { comments: CommentProps }) => {
    console.log("CommnetList component!!", comments);

    return (
        <>
            {comments.items.map((item: ICommentList) => (
                <div className={style.comment__container}>
                    <div className={style.img__container} key={item.id}>
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
                    </div>
                    <div className={style.main__container}>
                        <div className={style.author}>
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
                        </div>

                        <div className={style.comment}>
                            <span>
                                {
                                    item.snippet.topLevelComment.snippet
                                        .textDisplay
                                }
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
