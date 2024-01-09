import { ROUTE_CLIENT } from '@/lib/routes';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete('session', {
    path: ROUTE_CLIENT.root,
  });

  return redirect(ROUTE_CLIENT.login, 302);
};
