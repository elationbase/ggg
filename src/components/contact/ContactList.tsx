import type { ContactTypeWithId } from '@/lib/types';
import { Divider } from '@nextui-org/react';
import { ContactCard } from './ContactCard';

export function ContactList({ contacts }: { contacts: ContactTypeWithId[] }) {
  return (
    <>
      <Divider />
      <ul className="w-full grid grid-cols-1 gap-6 pb-4">
        {contacts.map((contact) => (
          <li key={contact.documentId}>
            <ContactCard contact={contact} />
            <Divider />
          </li>
        ))}
      </ul>
    </>
  );
}
