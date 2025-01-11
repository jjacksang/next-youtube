export const elapsedTime = (date: string): string => {
    const start = new Date(date);
    const end = new Date();
    const timeDiff = Math.abs(end.getTime() - start.getTime());

    const seconds = Math.floor(timeDiff / 1000);
    if (seconds < 60) return "방금 전";

    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;

    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;

    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    if (days < 30) return `${Math.floor(days / 7)}주 전`;

    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;

    const years = days / 365;
    return `${Math.floor(years)}년 전`;
};
