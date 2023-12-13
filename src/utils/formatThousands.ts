/**
 * Formats 5002452 to 5 002 452 or 4363,3255 to 4 363,3255
 */
export const formatThousands = (n: string | number | null | undefined, sep = ','): string => {
  if (n !== 0 && !n) {
    return '';
  }

  const value = typeof n === 'string' ? n.replace(/^0+/, '') : n.toString();
  const thousandsRegex = /\B(?=(\d{3})+(?!\d))/g;
  // eslint-disable-next-line prefer-const
  let [integerPart, decimalPart] = value.split('.');

  if (!integerPart) {
    integerPart = '0';
  }

  const formattedIntegerPart = integerPart.replace(thousandsRegex, ' ') || '';

  if (decimalPart) {
    return `${formattedIntegerPart}${sep}${decimalPart}`;
  }

  return formattedIntegerPart;
};
