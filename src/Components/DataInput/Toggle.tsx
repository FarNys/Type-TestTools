import React, { useState } from "react";

interface ToggleType {
  className?: String;
  isChecked?: boolean;
  onChange: (e: boolean) => void;
}

const Toggle = ({ className, isChecked, onChange, ...rest }: ToggleType) => {
  const [toggleState, settoggleState] = useState<boolean>(
    isChecked ? isChecked : false
  );

  const toggleHandler = () => {
    settoggleState((prev) => !prev);
    onChange(!toggleState);
  };

  return (
    <div
      role="checkbox"
      aria-checked="mixed"
      className={`relative w-10 h-5 border rounded-2xl cursor-pointer ${
        toggleState
          ? "bg-green-200 border-green-500"
          : "bg-slate-200 border-slate-500"
      }`}
      {...rest}
      onClick={toggleHandler}
    >
      <div
        className={`absolute rounded-full top-1/2 -translate-y-1/2 h-4 w-4 duration-150 bg-slate-600 border ${
          toggleState ? "bg-green-500 translate-x-5  " : "translate-x-0.5  "
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
