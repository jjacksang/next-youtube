export const formatNumber = (number: number) => {
    return new Intl.NumberFormat("ko-KR", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(+number);
};
