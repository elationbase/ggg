import { auth } from '@lib/firebase/server';

export async function getUser(cookie: string) {
  try {
    const decodedIdToken = await auth.verifySessionCookie(cookie, true);
    const user = await auth.getUser(decodedIdToken.uid);
    return user;
  } catch (error) {
    return null;
  }
}

export function getDaysLeftToDate(dateString: string): number {
  const today = new Date();
  const targetDate = new Date(dateString);
  const timeDifference = targetDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysLeft;
}
