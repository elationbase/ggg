import { z } from 'astro/zod';
import { zfd } from 'zod-form-data';

export const loginSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string().min(8, 'Password must be at least 8 characters long')),
});

export const registerSchema = zfd
  .formData({
    name: zfd.text(z.string().min(2, 'Name must be at least 2 character long')),
    email: zfd.text(z.string().email()),
    password: zfd.text(z.string().min(8, 'Password must be at least 8 characters long')),
    confirmPassword: zfd.text(z.string().min(8, 'Password must be at least 8 characters long')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
