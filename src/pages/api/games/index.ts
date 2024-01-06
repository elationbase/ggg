import { auth, firestore } from '@lib/firebase/server';
import { TEXT } from '@lib/i18n';
import { ROUTE_CLIENT } from '@lib/routes';
import { createGameSchema } from '@lib/schemas';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  /* Get cookie from header */
  const sessionCookie = cookies.get('session')?.value;
  if (!sessionCookie) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.noTokenFound,
      }),
      { status: 401 },
    );
  }
  /* Verify cookie */
  const { uid } = await auth.verifySessionCookie(sessionCookie, true);
  const formData = await request.formData();
  const result = createGameSchema.safeParse(formData);

  /* Validate the data */
  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 },
    );
  }

  const { name, location, date, time0, email0, time1, email1, time2, email2, time3, email3 } =
    result.data;

  const teeTimes = [
    {
      time: time0,
      email: email0,
    },
  ];

  if (time1 && email1) {
    teeTimes.push({
      time: time1,
      email: email1,
    });
  }

  if (time2 && email2) {
    teeTimes.push({
      time: time2,
      email: email2,
    });
  }

  if (time3 && email3) {
    teeTimes.push({
      time: time3,
      email: email3,
    });
  }

  const players = teeTimes.map((teeTime) => teeTime.email);

  /* Create the record */
  try {
    await firestore.collection('games').add({
      name,
      date,
      location,
      teeTimes,
      players,
      authorId: uid,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.somethingWentWrong,
      }),
      { status: 500 },
    );
  }

  return redirect(ROUTE_CLIENT.dashboard);
};
