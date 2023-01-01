import React, { useState } from "react";
import { VariantTypes } from "../sharedTypes";

interface CheckboxType extends React.ComponentPropsWithRef<"div"> {
  className?: string;
  isChecked?: boolean;
  variant?: VariantTypes;
  onToggle: (e: boolean) => void;
}

const Checkbox = ({
  className,
  isChecked,
  onToggle,
  variant = "default",
  ...rest
}: CheckboxType) => {
  const [checkState, setcheckState] = useState<boolean>(
    isChecked ? isChecked : false
  );
  const checkStateHandler = () => {
    setcheckState((prev) => !prev);
    onToggle(!checkState);
  };

  const hoverVariant: Record<VariantTypes, string> = {
    success: "hover:bg-green-100",
    danger: "hover:bg-red-100",
    warning: "hover:bg-orange-100",
    info: "hover:bg-sky-100",
    default: "hover:bg-slate-200",
  };
  const checkboxVariant: Record<VariantTypes, string> = {
    success: "bg-green-500 outline-green-500",
    danger: "bg-red-500 outline-red-500",
    warning: "bg-orange-500 outline-orange-500",
    info: "bg-sky-500 outline-sky-500",
    default: "bg-slate-600 outline-slate-600",
  };

  return (
    <div
      role="checkbox"
      aria-checked="mixed"
      className={`flex justify-center items-center w-8 h-8 rounded-full ${
        hoverVariant[variant]
      } cursor-pointer duration-150 ${className ? className : ""}`}
      onClick={checkStateHandler}
      {...rest}
    >
      <div
        className={`w-4 h-4 border rounded-full ${
          checkState
            ? `outline-1 outline ${checkboxVariant[variant]}`
            : "bg-white outline-1 outline-offset-2  outline outline-slate-600 border-slate-600"
        }`}
      ></div>
    </div>
  );
};

export default Checkbox;
