import { usePlayer } from '../contexts/player-context';
import { useTimestamp } from '../contexts/timestampContext';
import { parseTimeToSeconds, timeRegex } from '../utils/timestamp';

export function useTimestampParts(text: string) {
  const onTimestampClick = useTimestamp();
  const { focusPlayer } = usePlayer();

  return text.split(timeRegex).map((part, index) => {
    if (timeRegex.test(part)) {
      const seconds = parseTimeToSeconds(part);
      return (
        <button
          key={index}
          // className={styles.timestamp}
          onClick={() => {
            onTimestampClick(seconds);
            setTimeout(() => {
              focusPlayer();
            }, 0);
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
