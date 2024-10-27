import { isAxiosError } from 'axios';

export const parseApiError = (error: unknown) => {
  if (isAxiosError(error)) {
    return error.response?.data?.message ?? 'Something went wrong. Please try again later.';
  }

  return 'Something went wrong. Please try again later.';
};
