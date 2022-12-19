import React, { useCallback, useEffect, useRef, useState } from "react";
export interface OptionType {
  label: string;
  value: string | boolean | number;
}

interface DropdownType {
  options: OptionType[];
  value?: OptionType;
  onSelect: (e: OptionType) => void;
}

const Dropdown = ({ options, value, onSelect, ...rest }: DropdownType) => {
  const SelectRef = useRef<any>(null);
  const [showItems, setshowItems] = useState<boolean>(false);
  const [localValue, setlocalValue] = useState<string>(
    value ? value.label : "Select"
  );
  const itemSelectHandler = (e: OptionType): void => {
    setlocalValue(e.label);
    setshowItems(false);
    onSelect({ label: e.label, value: e.value });
  };

  //   const closeDrophandler = (e: any) => {
  //     setshowItems(false);
  //   };

  const clickOutside = useCallback((e: MouseEvent): void => {
    if (SelectRef?.current.contains(e.target)) {
      return setshowItems(true);
    } else {
      return setshowItems(false);
    }
  }, []);

  useEffect(() => {
    if (showItems) {
      window.addEventListener("click", clickOutside);
    }
    return () => window.removeEventListener("click", clickOutside);
  }, [showItems, clickOutside]);

  return (
    <div className="relative max-w-xs" {...rest} ref={SelectRef}>
      <div
        className="flex items-center py-1 px-2 mx-0.5 cursor-pointer border rounded-md"
        onClick={() => setshowItems((prev) => !prev)}
      >
        {localValue}
      </div>
      <div className="absolute left-0 top-10 w-full flex flex-col shadow-md z-50">
        {showItems &&
          options.map((el: OptionType, index: number) => (
            <div
              className="px-4 py-2 text-sm cursor-pointer bg-slate-50 hover:bg-slate-200 max-h-10"
              key={`${el.label}-${index}`}
              onClick={() => itemSelectHandler(el)}
            >
              {el.label}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
