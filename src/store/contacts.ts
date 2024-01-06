import type { ContactTypeWithId } from '@lib/types';
import { atom } from 'nanostores';

export const $contacts = atom<ContactTypeWithId[]>([]);

export function initContacts(contacts: ContactTypeWithId[]) {
  $contacts.set(contacts);
}

export function addContact(contact: ContactTypeWithId) {
  $contacts.set([...$contacts.get(), contact]);
}
