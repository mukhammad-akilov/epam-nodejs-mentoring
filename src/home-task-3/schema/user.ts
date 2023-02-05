import { z } from 'zod';

export const addSchema = z.object({
  body: z.object({
    login: z.string({
      required_error: 'Login is required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8)
      .max(30),
    age: z
      .number({
        required_error: 'Age is required',
      })
      .min(4)
      .max(130),
  }),
});

export const updateSchema = z.object({
  body: z.object({
    login: z.string({
      required_error: 'Login is required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8)
      .max(30),
    age: z
      .number({
        required_error: 'Age is required',
      })
      .min(4)
      .max(130),
  }),
});
