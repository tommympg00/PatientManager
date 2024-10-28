import { isAxiosError } from 'axios';

export const parseApiError = (error: unknown) => {
  if (isAxiosError(error)) {
    const errorData = error.response?.data;
    const messages: string[] = [];

    if (errorData?.errors) {
      Object.values(errorData.errors).forEach((errorArray) => {
        if (Array.isArray(errorArray)) {
          messages.push(...errorArray);
        }
      });
    }

    return messages.join('\n') || 'Something went wrong. Please try again later.';
  }

  return 'Something went wrong. Please try again later.';
};
