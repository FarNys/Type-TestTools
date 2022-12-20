import React from "react";

interface RangeSliderType {
  initialValue?: number;
  className?: string;
  minValue: number;
  maxValue: number;
  selectedValue: (e: number) => void;
}

const RangeSlider = ({
  initialValue,
  className,
  minValue,
  maxValue,
  selectedValue,
  ...rest
}: RangeSliderType) => {
  const mouseUpHandler = (e: any) => {
    selectedValue(e.target.value);
  };

  return (
    <div className="w-full relative">
      <input
        type="range"
        min={minValue}
        max={maxValue}
        defaultValue={initialValue || minValue}
        // value={rangeValue}
        className="appearance-none w-full max-w-max h-3 border rounded-md duration-200 bg-sky-100  cursor-pointer"
        onMouseUp={mouseUpHandler}
      />
    </div>
  );
};

export default RangeSlider;
