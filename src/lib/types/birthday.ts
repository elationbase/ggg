export type BirthdayType = {
  name: string;
  date: {
    day: number;
    month: number;
    year: number;
  };
  affiliation?: string;
  authorId: string;
};

export type BirthdayTypeWithId = BirthdayType & {
  documentId: string;
};

export type BirthdayWithDifference = BirthdayTypeWithId & {
  difference: number;
};
