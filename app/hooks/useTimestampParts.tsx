import { useTimestamp } from '../contexts/timestampContext';
import { parseTimeToSeconds, timeRegex } from '../utils/timestamp';

export function useTimestampParts(text: string) {
  const onTimestampClick = useTimestamp();

  return text.split(timeRegex).map((part, index) => {
    if (timeRegex.test(part)) {
      const seconds = parseTimeToSeconds(part);
      return (
        <button
          key={index}
          // className={styles.timestamp}
          onClick={() => {
            onTimestampClick(seconds);
          }}
          type="button"
        >
          {part}
        </button>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
