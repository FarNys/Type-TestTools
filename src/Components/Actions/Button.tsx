import React, { forwardRef, Ref } from "react";
import { SizeVariantTypes, VariantTypes } from "../sharedTypes";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  size: SizeVariantTypes;
  variant: VariantTypes;
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

  const sizeVariants: Record<SizeVariantTypes, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };

  const buttonVariants: Record<VariantTypes, string> = {
    default: "bg-slate-100 hover:bg-slate-200 active:bg-slate-300",
    danger: "bg-red-500 hover:bg-red-600  active:bg-red-700",
    success: "bg-green-500 hover:bg-green-600  active:bg-green-700",
    info: "bg-sky-500 hover:bg-sky-600 active:bg-sky-700",
    warning: "bg-orange-500 hover:bg-orange-600 active:bg-warning-700",
  };

  return (
    <button
      ref={ref}
      className={`rounded border mx-1 ${sizeVariants[size]} ${
        buttonVariants[variant]
      } ${className ? className : ""}`}
      {...rest}
    >
      {title} {children}
    </button>
  );
});

export default Button;
