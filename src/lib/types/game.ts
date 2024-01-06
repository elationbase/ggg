export type GuestType = {
  email: string;
};

export type TeaTimeType = {
  time: string;
  email: string;
};

export type GameType = {
  name: string;
  date: string;
  location: string;
  authorId: string;
  teeTimes: TeaTimeType[];
};

export type GameTypeWithId = GameType & {
  documentId: string;
};

export type GameWithDifferenceType = GameTypeWithId & {
  difference: number;
};
