import { type PropsWithChildren } from 'react';

import { type Styled } from '@/types';
import { cn } from '@/utils';

export const Title = ({ className, children }: PropsWithChildren<Styled>) => (
  <h1 className={cn('flex w-full justify-center text-3xl font-semibold text-primary', className)}>
    {children}
  </h1>
);
