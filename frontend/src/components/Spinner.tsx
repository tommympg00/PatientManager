import { type Styled } from "@/types";
import { cn } from "@/utils";

type SpinnerProps = {
  size?: "sm" | "md" | "lg" | "xl";
} & Styled;

export const Spinner = ({
  className = "",
  size = "md",
}: SpinnerProps): JSX.Element => (
  <div
    className={cn(
      className,
      "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-middle",
      size === "sm"
        ? "h-4 w-4"
        : size === "md"
        ? "h-6 w-6"
        : size === "lg"
        ? "h-8 w-8"
        : "h-12 w-12"
    )}
    role="status"
  />
);
