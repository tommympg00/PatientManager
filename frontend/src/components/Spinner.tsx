import { type Styled } from '@/types';
import { cn } from '@/utils';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

type SpinnerProps = {
  size?: SpinnerSize;
} & Styled;

const SPINNER_SIZES: {
  [key in SpinnerSize]: string;
} = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
  xl: 'size-12',
} as const;

export const Spinner = ({ className = '', size = 'md' }: SpinnerProps): JSX.Element => (
  <div
    className={cn(
      className,
      'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-middle',
      SPINNER_SIZES[size]
    )}
    role="status"
  />
);
