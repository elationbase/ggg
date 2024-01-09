import { auth, firestore } from '@/lib/firebase/server';
import { TEXT } from '@/lib/i18n';
import { ROUTE_CLIENT } from '@/lib/routes';
import { updateGameSchema } from '@/lib/schemas';
import type { GameTypeWithId } from '@/lib/types';
import type { APIRoute } from 'astro';

export const PUT: APIRoute = async ({ request, cookies, redirect, params }) => {
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
  const result = updateGameSchema.safeParse(formData);

  /* Validate the form data */
  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 },
    );
  }
  // Destructure the validated data into variables
  const {
    name,
    location,
    date,
    time0,
    time1,
    time2,
    time3,
    time0_player0,
    time0_player1 = '',
    time0_player2 = '',
    time0_player3 = '',
    time1_player0 = '',
    time1_player1 = '',
    time1_player2 = '',
    time1_player3 = '',
    time2_player0 = '',
    time2_player1 = '',
    time2_player2 = '',
    time2_player3 = '',
    time3_player0 = '',
    time3_player1 = '',
    time3_player2 = '',
    time3_player3 = '',
    authorId,
  } = result.data;

  // Create an array of tee times
  const teeTimes = [
    {
      time: time0,
      emails: [time0_player0, time0_player1, time0_player2, time0_player3],
    },
  ];

  // If a second tee time exists, add it to the teeTimes array
  if (time1) {
    teeTimes.push({
      time: time1,
      emails: [time1_player0, time1_player1, time1_player2, time1_player3],
    });
  }

  // If a third tee time exists, add it to the teeTimes array
  if (time2) {
    teeTimes.push({
      time: time2,
      emails: [time2_player0, time2_player1, time2_player2, time2_player3],
    });
  }

  // If a fourth tee time exists, add it to the teeTimes array
  if (time3) {
    teeTimes.push({
      time: time3,
      // Include the emails of the players for this tee time
      emails: [time3_player0, time3_player1, time3_player2, time3_player3],
    });
  }

  // Flatten the array of player emails into a single array
  const players = teeTimes.flatMap((teeTime) => teeTime.emails);

  if (uid !== authorId) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.unauthorizedRecord,
      }),
      { status: 401 },
    );
  }

  /* Get the record id */
  const documentId = params.id;
  if (!documentId) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.missingDocId,
      }),
      { status: 400 },
    );
  }

  /* Validate if the record exists */
  const record = await firestore.collection('games').doc(documentId).get();
  if (!record.exists) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.recordNotFound,
      }),
      { status: 404 },
    );
  }

  /* Update record */
  try {
    await firestore.collection('games').doc(documentId).update({
      name,
      date,
      location,
      teeTimes,
      players,
    });
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.somethingWentWrong,
      }),
    );
  }
  return redirect(ROUTE_CLIENT.dashboard, 302);
};

export const DELETE: APIRoute = async ({ cookies, redirect, params }) => {
  /* Get user id from cookie */
  const sessionCookie = cookies.get('session')?.value;
  if (!sessionCookie) {
    return new Response(
      JSON.stringify({
        error: 'No token found',
      }),
      { status: 401 },
    );
  }
  const { uid } = await auth.verifySessionCookie(sessionCookie, true);

  /* Get the record id */
  const documentId = params.id;
  if (!documentId) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.missingDeleteDocId,
      }),
      { status: 400 },
    );
  }
  /* Validate if the record exists */
  const record = await firestore.collection('games').doc(documentId).get();
  if (!record.exists) {
    return new Response(
      JSON.stringify({
        error: 'Record not found',
      }),
      { status: 404 },
    );
  }

  /* Validate if the user is the author */
  const { authorId } = record.data() as GameTypeWithId;
  if (uid !== authorId) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.unauthorizedRecord,
      }),
      { status: 401 },
    );
  }

  /* Delete the record */
  try {
    await firestore.collection('games').doc(documentId).delete();
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.somethingWentWrong,
      }),
      { status: 500 },
    );
  }
  return redirect(ROUTE_CLIENT.dashboard, 302);
};
