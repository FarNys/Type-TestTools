import React from "react";

interface AlertType {
  title: string;
  variant: "success" | "danger" | "info" | "warning";
  className?: string;
  icon?: React.ReactNode;
}

export type VariantsType = "success" | "danger" | "info" | "warning";

const Alert = ({ title, variant, className, icon }: AlertType) => {
  return (
    <div
      className={`d-flex justify-start py-3 px-3 rounded-md ${findVariant(
        variant
      )} ${className}`}
    >
      {icon}
      <span className="px-2">{title}</span>
    </div>
  );
};

const findVariant = (v: VariantsType): string => {
  const variants = {
    success: "bg-green-400",
    danger: "bg-red-400",
    info: "bg-sky-400",
    warning: "bg-orange-400",
  };

  return variants[v];
};

export default Alert;
