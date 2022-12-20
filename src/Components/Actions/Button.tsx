import React, { forwardRef, Ref, useMemo, useCallback } from "react";

type SizeType = "sm" | "md";
type ButtonVariant = "default" | "success" | "danger" | "info" | "warning";
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  size: "sm" | "md";
  variant: ButtonVariant;
}
interface SizeVariantsType {
  sm: string;
  md: string;
}
interface ButtonVariantsType {
  default: string;
  success: string;
  danger: string;
  info: string;
  warning: string;
}

const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const {
    title,
    children,
    className,
    size,
    variant = "default",
    ...rest
  } = props;
  return (
    <button
      ref={ref}
      className={`rounded-lg border mx-1 ${sizeCalculator(
        size
      )} ${variantCalculator(variant)} ${className}`}
      {...rest}
    >
      {title} {children}
    </button>
  );
});

export default Button;

const sizeCalculator = (el: SizeType): string => {
  const sizeVariants: SizeVariantsType = {
    sm: "px-3 py-1",
    md: "px-4 py-2",
  };
  return sizeVariants[el];
};

const variantCalculator = (el: ButtonVariant) => {
  const buttonVariants: ButtonVariantsType = {
    default: "bg-slate-100",
    danger: "bg-red-500 hover:bg-red-600  active:bg-red-700",
    success: "bg-green-500 hover:bg-green-600  active:bg-green-700",
    info: "bg-sky-500 hover:bg-sky-600 active:bg-sky-700",
    warning: "bg-orange-500 hover:bg-orange-600 active:bg-warning-700",
  };
  return buttonVariants[el] || buttonVariants.default;
};
