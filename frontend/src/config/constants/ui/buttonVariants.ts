export const BUTTON_VARIANTS = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
  outline: "outline",
} as const;

export type ButtonVariant =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];
