import styles from './skeleton-grid.module.css';

import { SkeletonSearch } from './skeleton-search';

export default function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className={styles.skeleton__container}>
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonSearch key={idx} />
      ))}
    </div>
  );
}
