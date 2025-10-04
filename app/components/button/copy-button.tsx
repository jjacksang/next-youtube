import style from './copy-button.module.css';

export default function CButton() {
  const clipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드 복사 성공');
      console.log(text);
    } catch (error) {
      console.error('클립보드 복사 실패', error);
    }
  };

  return (
    <button
      className={style.copy__button}
      type="button"
      onClick={() => clipBoard(window.location.href as string)}
    >
      복사
    </button>
  );
}
