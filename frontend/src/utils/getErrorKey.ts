import { type FieldErrors } from 'react-hook-form';

export const getErrorKey = (
  key: string | undefined,
  obj?: FieldErrors<Record<string, unknown>> | Record<string, { message: string }>
) => {
  if (!key) return;

  const keys = key.split('.');
  let value = obj;

  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in value) {
      value = value[k] as typeof value;
    } else {
      return undefined;
    }
  }

  return value as {
    message: string;
  };
};
