const roundToTwoDec = (val: string | number | null | undefined) => {
  if (typeof val === 'string') {
    return Math.round(Number(val) * 10) / 10;
  }
  if (typeof val === 'number') {
    return Math.round(val * 10) / 10;
  }
  return 0;
};

export { roundToTwoDec };
