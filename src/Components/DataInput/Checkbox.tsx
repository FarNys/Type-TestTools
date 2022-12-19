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
      <div>
        <svg
          version="1.1"
          id="Layer_1"
          // xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 406.834 406.834"
          style={{ fill: "red", width: "10px", height: "10px" }}
          // xml:space="preserve"
        >
          <polygon points="385.621,62.507 146.225,301.901 21.213,176.891 0,198.104 146.225,344.327 406.834,83.72 " />
        </svg>
      </div>
    </div>
  );
};

export default Checkbox;
