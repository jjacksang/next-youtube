import style from './commentList.module.css';

import { ICommentList } from '../utils/type';
import { elapsedTime } from '../utils/elapsedTime';
import Link from 'next/link';
import Image from 'next/image';
import CommentItem from './comment-item';

interface CommentListProps {
  comments: ICommentList[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  console.log('CommnetList component!!', comments);

  return (
    <>
      {comments.map((item: ICommentList) => (
        <div className={style.comment__container} key={item.etag}>
          <div className={style.comment__author__img}>
            <Link
              href={`/channel/${item.snippet.topLevelComment.snippet.authorChannelId.value}`}
              className={style.author__img}
            >
              <Image
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt={item.snippet.topLevelComment.snippet.authorChannelId.value}
                width={36}
                height={36}
                className={style.user__comment__img}
              />
            </Link>
          </div>
          <div className={style.main__container}>
            <div className={style.user__section}>
              <Link
                href={item.snippet.topLevelComment.snippet.authorChannelUrl}
                className={style.author}
              >
                <span className={style.author__comment}>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                </span>
              </Link>
              <span className={style.publishTime}>
                {elapsedTime(item.snippet.topLevelComment.snippet.publishedAt)}
              </span>
            </div>

            <CommentItem comment={item} />
          </div>
        </div>
      ))}
    </>
  );
};
