import styles from './ShareModal.module.css';

export default function ShareModal({ onClose }: { onClose: () => void }) {
  return <div className={styles.modal__panel}>나 공유하기</div>;
}
