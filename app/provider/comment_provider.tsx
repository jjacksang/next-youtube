"use client";

import style from "./comment_provider.module.css";

import { CommentList } from "../components/commentList";
import { useCommentInfiniteQuery } from "../hooks/useCommentInfiniteQuery";

export const CommentProvider = ({
    id,
    authorChannelId,
}: {
    id: string;
    authorChannelId: string;
}) => {
    const { ref, comments, isFetching, hasNextPage } = useCommentInfiniteQuery({
        id,
        authorChannelId,
    });

    return (
        <>
            <form className={style.comment__form}>
                <CommentList comments={comments} />
            </form>
            <div ref={ref} className="loading-trigger">
                {isFetching ? (
                    <div>댓글 불러오는중...</div>
                ) : hasNextPage ? (
                    <div>스크롤해보기</div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
};
