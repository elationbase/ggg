export function getDaysLeftToDate(dateString: string): number {
  const today = new Date();
  const targetDate = new Date(dateString);
  const timeDifference = targetDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysLeft;
}
