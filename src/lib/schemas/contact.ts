import { z } from 'astro/zod';
import { zfd } from 'zod-form-data';

const contactSchema = {
  name: zfd.text(z.string().min(2, 'Name must be at least 2 character long')),
  group: zfd.text(z.string().min(1, 'Group must be at least 1 character long').optional()),
  email: zfd.text(z.string().email('Please enter a valid email address')),
};

export const createContactSchema = zfd.formData({
  ...contactSchema,
});

export const updateContactSchema = zfd.formData({
  ...contactSchema,
  authorId: zfd.text(z.string()),
});
