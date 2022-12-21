import React, { useState } from "react";
import { VariantsType } from "../DataDisplay/Alert";

interface CheckboxType {
  className?: string;
  isChecked?: boolean;
  variant?: VariantsType;
  onChange: (e: boolean) => void;
}

const Checkbox = ({
  className,
  isChecked,
  onChange,
  variant,
  ...rest
}: CheckboxType) => {
  const [checkState, setcheckState] = useState<boolean>(
    isChecked ? isChecked : false
  );
  const checkStateHandler = () => {
    setcheckState((prev) => !prev);
    onChange(!checkState);
  };

  const hoverVariant: any = {
    success: "hover:bg-green-100",
    danger: "hover:bg-red-100",
    warning: "hover:bg-orange-100",
    info: "hover:bg-sky-100",
    default: "hover:bg-slate-200",
  };
  const checkboxVariant: any = {
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
        hoverVariant[variant as keyof VariantsType] || hoverVariant["default"]
      } cursor-pointer duration-150 ${className}`}
      onClick={checkStateHandler}
      {...rest}
    >
      <div
        className={`w-3 h-3 border ${
          checkState
            ? `outline-1 outline ${
                checkboxVariant[variant as keyof VariantsType]
              }`
            : "bg-white outline-1 outline-offset-1  outline outline-slate-600 border-slate-600"
        }`}
      ></div>
    </div>
  );
};

export default Checkbox;
