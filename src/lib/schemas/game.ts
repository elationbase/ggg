import { z } from 'astro/zod';
import { zfd } from 'zod-form-data';

const gameSchema = z.object({
  name: zfd.text(z.string().min(2, 'Name must be at least 2 character long')),
  location: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long')),
  date: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long')),
  time0: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long')),
  email0: zfd.text(z.string().email('Please enter a valid email address')),
  time1: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long').optional()),
  email1: zfd.text(z.string().email('Please enter a valid email address').optional()),
  time2: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long').optional()),
  email2: zfd.text(z.string().email('Please enter a valid email address').optional()),
  time3: zfd.text(z.string().min(1, 'Affiliation must be at least 1 character long').optional()),
  email3: zfd.text(z.string().email('Please enter a valid email address').optional()),
});

const gameSchemaWithId = gameSchema.extend({
  authorId: zfd.text(z.string()),
});

export const createGameSchema = zfd.formData(gameSchema);
export const updateGameSchema = zfd.formData(gameSchemaWithId);
