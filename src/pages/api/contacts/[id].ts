import { auth, firestore } from '@/lib/firebase/server';
import { TEXT } from '@/lib/i18n';
import { ROUTE_CLIENT } from '@/lib/routes';
import { updateContactSchema } from '@/lib/schemas';
import type { ContactTypeWithId } from '@/lib/types';
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
  const result = updateContactSchema.safeParse(formData);

  /* Validate the form data */
  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 },
    );
  }
  const { name, email, group, authorId } = result.data;

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
  const record = await firestore.collection('contacts').doc(documentId).get();
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
    await firestore
      .collection('contacts')
      .doc(documentId)
      .update({
        name,
        email,
        group: group ? group.toLowerCase() : '',
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
        error: TEXT.error.noTokenFound,
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
  const record = await firestore.collection('contacts').doc(documentId).get();
  if (!record.exists) {
    return new Response(
      JSON.stringify({
        error: TEXT.error.noTokenFound,
      }),
      { status: 404 },
    );
  }

  /* Validate if the user is the author */
  const { authorId } = record.data() as ContactTypeWithId;
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
    await firestore.collection('contacts').doc(documentId).delete();
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
