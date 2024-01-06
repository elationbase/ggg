import { TEXT } from '@lib/i18n';
import { ROUTE_CLIENT } from '@lib/routes';
import { Show } from '@ui/Show';

export function ButtonBack({ currentPath }: { currentPath: string }) {
  let backPath = ROUTE_CLIENT.dashboard;

  if (currentPath.includes(ROUTE_CLIENT.editContact)) {
    backPath = ROUTE_CLIENT.contacts;
  }

  return (
    <Show when={currentPath !== ROUTE_CLIENT.dashboard}>
      <a href={backPath} className="flex gap-1 items-center text-lg">
        {TEXT.app.back}
      </a>
    </Show>
  );
}
