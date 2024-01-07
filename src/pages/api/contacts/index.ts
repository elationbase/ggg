import { auth, firestore } from '@lib/firebase/server';
import { TEXT } from '@lib/i18n';
import { ROUTE_CLIENT } from '@lib/routes';
import { createContactSchema } from '@lib/schemas';
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
  const result = createContactSchema.safeParse(formData);

  /* Validate the data */
  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 },
    );
  }
  const { name, group, email } = result.data;

  /* Create the record */
  try {
    await firestore.collection('contacts').add({
      name,
      email,
      group: group ? group.toLowerCase() : '',
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

  return redirect(ROUTE_CLIENT.contacts, 302);
};
