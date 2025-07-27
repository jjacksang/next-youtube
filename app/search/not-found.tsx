import styles from './not-found.module.css';
import { FiInfo } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className={styles.not__found}>
      <span className={styles.message}>
        <FiInfo />
        검색 결과가 올바르지 않거나 결과가 없습니다.
      </span>
    </div>
  );
}
