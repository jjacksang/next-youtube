import { BiLike } from 'react-icons/bi';
import styles from './comment-item.module.css';
import { ICommentList } from '../utils/type';

export default function CommentItem({ comments }: { comments: ICommentList }) {
  return (
    <div>
      <div className={styles.comment}>
        <span>{comments.snippet.topLevelComment.snippet.textDisplay}</span>
      </div>
      <div className={styles.comment__icon}>
        <BiLike />
        {comments.snippet.topLevelComment.snippet.likeCount}
      </div>
    </div>
  );
}
