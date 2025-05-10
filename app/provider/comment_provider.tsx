"use client";

import style from "./comment_provider.module.css";

import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { CommentList } from "../components/commentList";
import { ICommentList } from "../utils/type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCommentList } from "../utils/api";

export const CommentProvider = ({
    id,
    authorChannelId,
}: {
    id: string;
    authorChannelId: string;
}) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    // infiniteQuery로 호출 밑 상태 관리
    const { status, data, isFetching, fetchNextPage, hasNextPage } =
        useInfiniteQuery({
            queryFn: async ({ pageParam }) => {
                return fetchCommentList({ id: id, pageToken: pageParam });
            },
            getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
            queryKey: ["comments", id],
            initialPageParam: undefined as unknown as string,
        });

    // observer와 infiniteQuery에서 제공하는 상태를 통해 호출
    useEffect(() => {
        if (inView && !isFetching && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetching, fetchNextPage, hasNextPage]);

    const allComments: ICommentList[] = useMemo(() => {
        if (!data?.pages) {
            console.log("불러올 데이터가 없습니다.", status);

            return [];
        }

        // 최종 데이터를 하나의 배열로 조립
        const allItems = data.pages.flatMap((page) => page.items || []);

        // 무한스크롤중 length에 도달 후 comment가 중복호출되는것을 방지
        const uniqueIds = new Set<string>();

        const filteredComments = allItems.filter((comment) => {
            if (!comment.snippet.topLevelComment.etag) return false;

            if (uniqueIds.has(comment.snippet.topLevelComment.etag)) {
                return false;
            }

            uniqueIds.add(comment.snippet.topLevelComment.etag);
            return true;
        });

        return filteredComments.sort((a, b) => {
            const isAuthorCommentA =
                a.snippet.topLevelComment.snippet.authorChannelId?.value ===
                authorChannelId;
            const isAuthorCommentB =
                b.snippet.topLevelComment.snippet.authorChannelId?.value ===
                authorChannelId;

            if (isAuthorCommentA && !isAuthorCommentB) return -1;
            if (!isAuthorCommentA && isAuthorCommentB) return 1;

            return 0;
        });
    }, [data?.pages]);

    console.log("allComments!!", allComments);

    console.log(id);

    console.log(data);
    console.log(data?.pages[0].nextPageToken);
    console.log(hasNextPage);

    return (
        <>
            <form className={style.comment__form}>
                <CommentList comments={allComments} />
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
