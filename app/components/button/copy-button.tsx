import style from './copy-button.module.css';

export default function CButton({ url }: { url: string }) {
  const clipBoard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('클립보드 복사 성공');
      console.log(url);
    } catch (error) {
      console.error('클립보드 복사 실패', error);
    }
  };

  return (
    <button
      className={style.copy__button}
      type="button"
      onClick={() => clipBoard(url)}
    >
      복사
    </button>
  );
}
