import { getDaysLeftToDate } from '@/utils';
import type { ChipProps } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';

export function DayCounter({ gameDate }: { gameDate: string }) {
  const days = getDaysLeftToDate(gameDate);

  const isToday = days === 0;
  const isTomorrow = days === 1;
  let message = `In ${days} days`;
  let color = 'success' as ChipProps['color'];

  if (isTomorrow) {
    message = 'Tomorrow';
    color = 'warning';
  } else if (isToday) {
    message = 'Today';
    color = 'danger';
  }

  return (
    <Chip color={color} variant="flat">
      {message}
    </Chip>
  );
}
