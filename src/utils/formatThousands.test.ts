import { formatThousands } from './formatThousands';

describe('formatThousands function', () => {
  it('formats a positive integer without decimals', () => {
    expect(formatThousands(1234567)).toBe('1 234 567');
  });

  it('formats a positive integer with decimals', () => {
    expect(formatThousands(9876543.21)).toBe('9 876 543,21');
  });

  it('formats a positive float with only one decimal place', () => {
    expect(formatThousands(9876543.5)).toBe('9 876 543,5');
  });

  it('formats a negative integer', () => {
    expect(formatThousands(-1234567)).toBe('-1 234 567');
  });

  it('formats a negative float', () => {
    expect(formatThousands(-9876543.21)).toBe('-9 876 543,21');
  });

  it('formats a string representing a positive float with comma', () => {
    expect(formatThousands('9876543,21')).toBe('9 876 543,21');
  });

  it('formats a string representing a negative integer', () => {
    expect(formatThousands('-1234567')).toBe('-1 234 567');
  });

  it('formats a string representing a negative float', () => {
    expect(formatThousands('-9876543.21')).toBe('-9 876 543,21');
  });

  it('formats zero', () => {
    expect(formatThousands(0)).toBe('0');
  });

  it('handles null input', () => {
    expect(formatThousands(null)).toBe('');
  });

  it('handles undefined input', () => {
    expect(formatThousands(undefined)).toBe('');
  });

  it('handles NaN input', () => {
    expect(formatThousands(NaN)).toBe('');
  });

  it('handles zero as a string', () => {
    expect(formatThousands('0')).toBe('0');
  });

  it('handles a string with only decimals', () => {
    expect(formatThousands('.25')).toBe('0,25');
  });

  it('handles a string with leading zeros', () => {
    expect(formatThousands('00123.45')).toBe('123,45');
  });

  it('handles a string with trailing zeros', () => {
    expect(formatThousands('12345.001')).toBe('12 345,001');
  });

  it('handles an empty string', () => {
    expect(formatThousands('')).toBe('');
  });
});
