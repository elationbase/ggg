export type ContactFormType = {
  name: string;
  group?: string;
  email: string;
};

export type ContactType = {
  name: string;
  group?: string;
  authorId: string;
  email: string;
};

export type ContactTypeWithId = ContactType & {
  documentId: string;
};
