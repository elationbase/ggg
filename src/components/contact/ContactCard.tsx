import { ROUTE_CLIENT } from '@lib/routes';
import type { ContactTypeWithId } from '@lib/types';
import { User } from '@nextui-org/react';
import { Show } from '@ui/Show';
import { Tag } from '@ui/Tag';

export function ContactCard({
  contact,
  isSelect,
}: {
  contact: ContactTypeWithId;
  isSelect?: boolean;
}) {
  return (
    <li>
      <div className="flex items-center">
        <User name={contact.name} description={contact.email} />
      </div>
      <Show when={!isSelect}>
        <div className="flex items-center">
          <a
            href={`${ROUTE_CLIENT.editContact}/${contact.documentId}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 mr-4">
            Edit
          </a>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
            Delete
          </button>
          <Show when={Boolean(contact.group)}>
            <Tag text={contact.group ?? ''} />
          </Show>
        </div>
      </Show>
    </li>
  );
}
