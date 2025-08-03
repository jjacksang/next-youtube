import styles from './page.module.css';

export default function Shorts() {
  return (
    <div className={styles.container}>
      <div className={styles.short__container}>
        <section className={styles.short__section}>Short section</section>
      </div>
      <div className={styles.toggle}>
        <form className={styles.toggle__form}>
          <button type="button">좋아요</button>
          <button type="button">싫어요</button>
          <button type="button">댓글</button>
          <button type="button">공유</button>
        </form>
      </div>
    </div>
  );
}
