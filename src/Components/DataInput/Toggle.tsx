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
      className={`relative w-8 h-4 border rounded-lg cursor-pointer ${
        toggleState ? "bg-green-200" : "bg-slate-200"
      }`}
      {...rest}
      onClick={toggleHandler}
    >
      <div
        className={`absolute rounded-full top-1/2 -translate-y-1/2 h-3 w-3 duration-150 bg-slate-600 ${
          toggleState ? "bg-green-500 translate-x-4" : "translate-x-0.5"
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
