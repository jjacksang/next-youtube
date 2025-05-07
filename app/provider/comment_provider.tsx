"use client";

import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CommentList } from "../components/commentList";
import { ICommentList } from "../utils/type";
import { useInfiniteQuery } from "@tanstack/react-query";

type CommentProps = {
    items: ICommentList[];
};

export const CommentProvider = ({ id }: { id: string }) => {
    const [comments, setComments] = useState<CommentProps>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ref, inView] = useInView();

    const fetchCommentList = async ({
        id,
        pageToken,
    }: {
        id: string;
        pageToken?: string;
    }) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/commentThreads?part=snippet&videoId=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
            console.error(response.status);
        }

        return await response.json();
    };

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
    console.log(hasNextPage);
    return (
        <>
            {/* <CommentList comments={comments} />; */}
            <div ref={ref} className="loading-trigger">
                {isFetching && <div>댓글 불러오는중...</div>}
            </div>
        </>
    );
};
