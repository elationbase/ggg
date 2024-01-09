import { auth, firestore } from '@/lib/firebase/server';
import { TEXT } from '@/lib/i18n';
import { ROUTE_CLIENT } from '@/lib/routes';
import { createGameSchema } from '@/lib/schemas';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  // Get the session cookie from the request headers
  const sessionCookie = cookies.get('session')?.value;
  // If no session cookie is found, return an error response
  if (!sessionCookie) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.noTokenFound,
      }),
      { status: 401 },
    );
  }
  // Verify the session cookie to get the user's ID
  const { uid } = await auth.verifySessionCookie(sessionCookie, true);
  // Parse the form data from the request
  const formData = await request.formData();
  // Validate the form data against the createGameSchema
  const result = createGameSchema.safeParse(formData);

  // If the validation fails, return an error response
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

  /* Create the record */
  try {
    // Add a new document to the 'games' collection in Firestore
    await firestore.collection('games').add({
      name,
      date,
      location,
      teeTimes,
      players,
      // The author of the game is the current user
      authorId: uid,
    });
  } catch (error) {
    // If there's an error, return a 500 response with an error message
    return new Response(
      JSON.stringify({
        error: TEXT.error.somethingWentWrong,
      }),
      { status: 500 },
    );
  }

  // If everything goes well, redirect the user to the dashboard
  return redirect(ROUTE_CLIENT.dashboard);
};
