"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CommentList } from "../components/commentList";
import { ICommentList } from "../utils/type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCommentList } from "../utils/api";

type CommentProps = {
    items: ICommentList[];
};

export const CommentProvider = ({ id }: { id: string }) => {
    const [comments, setComments] = useState<CommentProps>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ref, inView] = useInView({
        threshold: 0.7,
        triggerOnce: false,
    });

    const { status, data, error, isFetching, fetchNextPage, hasNextPage } =
        useInfiniteQuery({
            queryFn: async ({ pageParam }) => {
                return fetchCommentList({ id: id, pageToken: pageParam });
            },
            getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
            queryKey: ["comments", id],
            initialPageParam: undefined as unknown as string,
        });

    useEffect(() => {
        if (inView && !isFetching && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetching, fetchNextPage, hasNextPage]);

    console.log(data);
    console.log(data?.pages[0].nextPageToken);
    console.log(hasNextPage);
    console.log(fetchNextPage);
    return (
        <>
            {/* <CommentList comments={comments} />; */}
            <div ref={ref} className="loading-trigger">
                {isFetching && <div>댓글 불러오는중...</div>}
            </div>
        </>
    );
};
