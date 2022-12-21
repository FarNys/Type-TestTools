import React, { useState } from "react";
import { VariantsType } from "../DataDisplay/Alert";

interface ToggleType {
  className?: String;
  isChecked?: boolean;
  variant: VariantsType;
  onChange: (e: boolean) => void;
}

const Toggle = ({
  className,
  isChecked,
  onChange,
  variant,
  ...rest
}: ToggleType) => {
  const [toggleState, settoggleState] = useState<boolean>(
    isChecked ? isChecked : false
  );

  const toggleHandler = () => {
    settoggleState((prev) => !prev);
    onChange(!toggleState);
  };

  const toggleVariant: any = {
    success: "bg-green-200 border-green-500",
    danger: "bg-red-200 border-red-500",
    warning: "bg-orange-200 border-orange-500",
    info: "bg-sky-200 border-sky-500",
    default: "bg-slate-200 border-slate-500",
  };

  const bulletVariant: any = {
    success: "bg-green-500",
    danger: "bg-red-500",
    warning: " bg-orange-500",
    info: "bg-sky-500",
    default: "bg-slate-500",
  };

  return (
    <div
      role="checkbox"
      aria-checked="mixed"
      className={`relative w-10 h-5 border rounded-2xl cursor-pointer ${
        toggleState
          ? toggleVariant[variant as keyof VariantsType]
          : toggleVariant["default"]
      }`}
      {...rest}
      onClick={toggleHandler}
    >
      <div
        className={`absolute rounded-full top-1/2 -translate-y-1/2 h-4 w-4 duration-150  border ${
          toggleState
            ? `${bulletVariant[variant as keyof VariantsType]}  translate-x-5 `
            : "translate-x-0.5 bg-slate-600 "
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
