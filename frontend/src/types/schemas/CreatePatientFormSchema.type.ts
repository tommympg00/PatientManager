import { z } from 'zod';

const COUNTRY_CODE_REGEXP = /^\+\d{1,3}$/;
const PHONE_NUMBER_REGEXP = /^\d{7,14}$/;

export const createPatientFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .regex(/^[A-Za-z]+$/, { message: 'Name must contain only letters' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .endsWith('@gmail.com', { message: 'Email must be a Gmail address' }),
  phone: z.object({
    countryCode: z.string().regex(COUNTRY_CODE_REGEXP, { message: 'Invalid country code format' }),
    number: z
      .string()
      .regex(PHONE_NUMBER_REGEXP, { message: 'Phone number must be between 7 to 14 digits' })
      .refine((value) => !value.startsWith('0'), {
        message: 'Phone number should not start with 0',
      }),
  }),
  documentPhoto: z.instanceof(File).refine((file) => file.type === 'image/jpeg', {
    message: 'Document photo must be a .jpg file',
  }),
});

export type CreatePatientFormSchema = z.infer<typeof createPatientFormSchema>;
