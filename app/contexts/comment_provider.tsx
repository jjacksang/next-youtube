'use client';

import style from './comment_provider.module.css';

import { CommentList } from '../components/comment/commentList';
import { useCommentInfiniteQuery } from '../hooks/useCommentInfiniteQuery';
import { TimestampContext } from './timestampContext';
import { usePlayer } from './player-context';

export const CommentProvider = ({
  id,
  authorChannelId,
}: {
  id: string;
  authorChannelId: string;
}) => {
  const { ref, comments, isFetching, hasNextPage, error, status } =
    useCommentInfiniteQuery({
      id,
      authorChannelId,
    });

  const playerRef = usePlayer();

  const handleClick = (seconds: number) => {
    playerRef.current?.seekTo(seconds, 'seconds');
  };

  console.log(error);

  if (status === 'error') {
    const err = error as { code?: number; message?: string };

    console.log(err.message);

    if (err?.code === 403) {
      return (
        <div className={style.comment__disable}>
          해당 영상의 댓글이 비활성화되었습니다.
        </div>
      );
    }

    return (
      <div className={style.comment__error}>
        댓글을 불러오는 중 오류가 발생하였습니다.
      </div>
    );
  }

  return (
    <>
      <form className={style.comment__form}>
        <TimestampContext.Provider value={handleClick}>
          <CommentList comments={comments} />
        </TimestampContext.Provider>
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
