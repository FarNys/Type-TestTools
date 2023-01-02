import React, { useState } from "react";
import { VariantTypes } from "../sharedTypes";

interface ToggleType extends React.ComponentPropsWithRef<"div"> {
  className?: string;
  isChecked?: boolean;
  variant?: VariantTypes;
  onToggle: (e: boolean) => void;
}

const Toggle = ({
  className,
  isChecked = false,
  onToggle,
  variant = "default",
  ...rest
}: ToggleType) => {
  const [toggleState, settoggleState] = useState<boolean>(
    isChecked ? isChecked : false
  );

  const toggleHandler = () => {
    settoggleState((prev) => !prev);
    onToggle(!toggleState);
  };

  const toggleVariant: Record<VariantTypes, string> = {
    success: "bg-green-200 border-green-500",
    danger: "bg-red-200 border-red-500",
    warning: "bg-orange-200 border-orange-500",
    info: "bg-sky-200 border-sky-500",
    default: "bg-slate-200 border-slate-500",
  };

  const bulletVariant: Record<VariantTypes, string> = {
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
        toggleState ? toggleVariant[variant] : toggleVariant["default"]
      }`}
      {...rest}
      onClick={toggleHandler}
      dir="ltr"
    >
      <div
        className={`absolute rounded-full top-1/2 -translate-y-1/2 h-4 w-4 duration-150  border ${
          toggleState
            ? `${bulletVariant[variant]}  translate-x-5 `
            : "translate-x-0.5 bg-slate-600 "
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
