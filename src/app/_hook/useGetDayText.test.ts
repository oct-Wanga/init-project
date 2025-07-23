import dayjs from 'dayjs';

import useGetDayText from './useGetDayText';

describe('useGetDayText', () => {
  it('should return formatted date string for valid date input (default type)', () => {
    const date = '2025-05-07T15:30:00';
    const result = useGetDayText(date);
    expect(result).toBe('2025. 05. 07 15:30:00');
  });

  it('should return formatted date string for dayjs input', () => {
    const date = dayjs('2025-01-01T12:00:00');
    const result = useGetDayText(date);
    expect(result).toBe('2025. 01. 01 12:00:00');
  });

  it('should return elapsed time for timestamp type as string', () => {
    const result = useGetDayText('3661', 'elapsedTime'); // 1시간 1분 1초
    expect(result).toBe('1시간 1분 1초 경과');
  });

  it('should return elapsed time for timestamp type as number', () => {
    const result = useGetDayText(7320, 'elapsedTime'); // 2시간 2분
    expect(result).toBe('2시간 2분 경과');
  });

  it('should return "유효하지 않은 시간" for invalid date', () => {
    const result = useGetDayText('invalid-date');
    expect(result).toBe('유효하지 않은 시간');
  });

  it('should handle 0 seconds elapsed time', () => {
    const result = useGetDayText(0, 'elapsedTime');
    expect(result).toBe(' 경과');
  });

  it('should handle partial duration (only seconds)', () => {
    const result = useGetDayText(45, 'elapsedTime');
    expect(result).toBe('45초 경과');
  });
});
