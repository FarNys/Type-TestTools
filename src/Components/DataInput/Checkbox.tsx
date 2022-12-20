import React, { useState } from "react";

interface CheckboxType {
  className?: string;
  isChecked?: boolean;
  onChange: (e: boolean) => void;
}

const Checkbox = ({
  className,
  isChecked,
  onChange,
  ...rest
}: CheckboxType) => {
  const [checkState, setcheckState] = useState<boolean>(
    isChecked ? isChecked : false
  );
  const checkStateHandler = () => {
    setcheckState((prev) => !prev);
    onChange(!checkState);
  };

  return (
    <div
      role="checkbox"
      aria-checked="mixed"
      className={`flex justify-center items-center w-7 h-7 rounded-full hover:bg-green-200 cursor-pointer duration-150 ${className}`}
      onClick={checkStateHandler}
    >
      <div
        className={`w-3 h-3 border ${
          checkState
            ? "bg-green-500 outline-1 outline outline-green-500"
            : "bg-white"
        }`}
      ></div>
    </div>
  );
};

export default Checkbox;