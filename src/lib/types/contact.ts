export type ContactType = {
  name: string;
  group?: string;
  authorId: string;
  email: string;
};

export type ContactTypeWithId = ContactType & {
  documentId: string;
};
