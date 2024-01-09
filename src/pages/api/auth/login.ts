import { auth } from '@/lib/firebase/server';
import { TEXT } from '@/lib/i18n';
import { ROUTE_CLIENT } from '@/lib/routes';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ redirect, request, cookies }) => {
  /* Get the ID token from header */
  const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

  if (!idToken) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.noTokenFound,
      }),
      { status: 401 },
    );
  }

  let sessionCookie;
  try {
    /* Verify the ID token */
    await auth.verifyIdToken(idToken);
    const fiveDays = 60 * 60 * 24 * 5 * 1000;
    sessionCookie = await auth
      .createSessionCookie(idToken, { expiresIn: fiveDays })
      .catch((error) => {
        return new Response(
          JSON.stringify({
            message: error.message,
          }),
          { status: 401 },
        );
      });
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.somethingWentWrong,
      }),
      { status: 401 },
    );
  }

  cookies.set('session', sessionCookie, {
    path: ROUTE_CLIENT.root,
  });

  return redirect(ROUTE_CLIENT.dashboard, 302);
};
