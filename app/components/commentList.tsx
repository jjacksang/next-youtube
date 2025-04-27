import { ICommentList } from "../utils/type";

type CommentProps = {
    items: ICommentList[];
};

export const CommentList = ({ comments }: { comments: CommentProps }) => {
    console.log("CommnetList component!!", comments);

    return (
        <div>
            {comments.items.map((item: ICommentList) => (
                <div key={item.id}>
                    <div>
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
                    <div>
                        <span>
                            {item.snippet.topLevelComment.snippet.textDisplay}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
