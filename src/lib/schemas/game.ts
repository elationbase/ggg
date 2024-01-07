import { z } from 'astro/zod';
import { zfd } from 'zod-form-data';

const gameSchema = {
  name: zfd.text(z.string().min(2, 'Name must be at least 2 character long')),
  location: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long')),
  date: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long')),
  time0: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long')),
  time1: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long').optional()),
  time2: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long').optional()),
  time3: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long').optional()),
  time0_player0: zfd.text(),
  time0_player1: zfd.text().optional(),
  time0_player2: zfd.text().optional(),
  time0_player3: zfd.text().optional(),
  time1_player0: zfd.text().optional(),
  time1_player1: zfd.text().optional(),
  time1_player2: zfd.text().optional(),
  time1_player3: zfd.text().optional(),
  time2_player0: zfd.text().optional(),
  time2_player1: zfd.text().optional(),
  time2_player2: zfd.text().optional(),
  time2_player3: zfd.text().optional(),
  time3_player0: zfd.text().optional(),
  time3_player1: zfd.text().optional(),
  time3_player2: zfd.text().optional(),
  time3_player3: zfd.text().optional(),
};
export const createGameSchema = zfd.formData({
  ...gameSchema,
});
export const updateGameSchema = zfd.formData({
  ...gameSchema,
  authorId: zfd.text(z.string()),
});
