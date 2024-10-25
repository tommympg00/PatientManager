import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";

import { cn } from "@/utils";

import { Spinner } from "..";
import { ButtonVariant } from "@/config";

const BUTTON_VARIANT_CLASSES: {
  [key in ButtonVariant]: string;
} = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  danger: "bg-danger text-danger-foreground",
  outline: "text-primary",
} as const;

export type ButtonProps = {
  loading?: boolean;
  variant?: ButtonVariant;
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      disabled,
      className,
      loading,
      type = "button",
      variant = "primary",
      icon,
      ...rest
    },
    ref
  ) => (
    <button
      {...rest}
      onClick={onClick}
      type={type}
      disabled={disabled ?? loading}
      className={cn(
        "flex flex-row items-center justify-center gap-5 rounded-md px-4 py-2 font-medium",
        disabled ?? loading
          ? "!bg-disabled cursor-not-allowed opacity-40"
          : "hover:opacity-75",
        BUTTON_VARIANT_CLASSES[variant],
        className
      )}
      ref={ref}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </button>
  )
);

Button.displayName = "Button";
