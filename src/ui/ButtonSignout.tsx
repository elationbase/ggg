import { ROUTE_API } from '@lib/routes';

export function ButtonSignout() {
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
    <button
      className="border border-0.5 border-zinc-300 text-zinc-300 hover:bg-slate-500 font-normal  transition-all px-4 py-1 rounded-md"
      type="button"
      onClick={signout}>
      Sign out
    </button>
  );
}
