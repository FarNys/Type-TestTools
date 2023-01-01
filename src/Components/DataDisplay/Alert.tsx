import React from "react";
import { VariantTypes } from "../sharedTypes";
interface AlertType extends React.ComponentPropsWithRef<"div"> {
  title: string;
  variant?: VariantTypes;
  className?: string;
  icon?: React.ReactNode;
}

const Alert = ({
  title,
  variant = "default",
  className,
  icon,
  ...rest
}: AlertType) => {
  const variants: Record<VariantTypes, string> = {
    success: "bg-green-100 text-green-600",
    danger: "bg-red-100 text-red-600",
    info: "bg-sky-100 text-sky-600",
    warning: "bg-orange-100 text-orange-600",
    default: "bg-slate-100 text-slate-600",
  };

  return (
    <div
      className={`d-flex justify-start py-3 px-3 rounded-md ${variants[variant]} ${className}`}
      {...rest}
    >
      {icon}
      <span className="px-2">{title}</span>
    </div>
  );
};

export default Alert;
