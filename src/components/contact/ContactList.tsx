import type { ContactTypeWithId } from '@lib/types';
import { ContactCard } from './ContactCard';

export function ContactList({ contacts }: { contacts: ContactTypeWithId[] }) {
  return (
    <ul class="w-full grid grid-cols-1 gap-6 pb-4">
      {contacts.map((contact) => (
        <ContactCard contact={contact} key={contact.documentId} />
      ))}
    </ul>
  );
}
