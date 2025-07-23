import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export default function useGetDayText(time: string | number | dayjs.Dayjs, type?: 'timestamp' | 'elapsedTime'): string {
  const targetTime = dayjs(time);

  if (!targetTime.isValid()) return '유효하지 않은 시간';

  if (type === 'elapsedTime') {
    const elapsed = typeof time === 'string' ? parseInt(time, 10) : Number(time);
    const dur = dayjs.duration(elapsed, 'seconds');

    const timeText = [
      dur.hours() ? `${dur.hours()}시간` : '',
      dur.minutes() ? `${dur.minutes()}분` : '',
      dur.seconds() ? `${dur.seconds()}초` : '',
    ].filter(Boolean);

    return `${timeText.join(' ')} 경과`;
  }

  return targetTime.format('YYYY. MM. DD HH:mm:ss');
}
