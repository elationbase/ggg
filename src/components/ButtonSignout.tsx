import { ROUTE_API } from '@/lib/routes';
import { Button } from '@/ui';

export function ButtonSignout({ isAccountPage }: { isAccountPage?: boolean }) {
  async function signout() {
    const res = await fetch(ROUTE_API.signout);
    if (!res.ok) {
      const data = await res.json();
      return data;
    }
    if (res.redirected) {
      window.location.assign(res.url);
    }
  }

  return (
    <Button
      type="button"
      variant="bordered"
      color={isAccountPage ? 'danger' : 'default'}
      fullWidth={isAccountPage ? true : false}
      onClick={signout}>
      Sign out
    </Button>
  );
}
