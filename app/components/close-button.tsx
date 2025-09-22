import styles from './close-button.module.css';

import { IoClose } from 'react-icons/io5';

export default function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button className={styles.close__button} onClick={onClose} type="button">
      <IoClose />
    </button>
  );
}
