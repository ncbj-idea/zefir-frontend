export const generateYearTimeSeries = (range: { min: number; max: number }) => {
  let base = 2023;
  let i = 0;
  const series = [];
  while (i < 12) {
    const x = base;
    const y = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

    series.push([x, y]);
    base += 1;
    i += 1;
  }
  return series;
};
