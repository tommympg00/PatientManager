import { type PropsWithChildren } from "react";

import { type Styled } from "@/types";
import { cn } from "@/utils";

export const Subtitle = ({
  className,
  children,
}: PropsWithChildren<Styled>) => (
  <h2
    className={cn(
      "flex w-full justify-center text-xl font-semibold text-primary",
      className
    )}
  >
    {children}
  </h2>
);
