import styles from './description.module.css';

import Link from 'next/link';

export default function Description({ description }: { description: string }) {
  const convertUrls = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <Link
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </Link>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={styles.description}>
      <input
        type="checkbox"
        id="descriptionToggle"
        className={styles.description_more_btn}
      />
      <span className={styles.description_text}>
        {convertUrls(description)}
      </span>
      <label
        htmlFor="descriptionToggle"
        className={styles.description_label}
      ></label>
    </div>
  );
}
