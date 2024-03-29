import { auth } from '@/lib/firebase/server';
import { ROUTE_CLIENT } from '@/lib/routes';
import { registerSchema } from '@/lib/schemas';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const result = registerSchema.safeParse(formData);

  /* Validate the data */
  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: result.error.flatten(),
      }),
      { status: 400 },
    );
  }

  /* Create the user */
  const { email, password, name } = result.data;

  try {
    await auth.createUser({
      email,
      password,
      displayName: name,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.code,
      }),
      { status: 400 },
    );
  }
  return redirect(ROUTE_CLIENT.login, 302);
};
