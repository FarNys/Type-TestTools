import React, { useCallback, useEffect, useRef, useState } from "react";
import { OptionType } from "./Dropdown";
import Typography from "../Typo/Typography";

interface DropdownType {
  options: OptionType[];
  values?: OptionType[];
  onSelect: (e: OptionType[]) => void;
}

interface CoodrinateType {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

const DropdownMulti = ({
  options,
  values,
  onSelect,
  ...rest
}: DropdownType) => {
  const selectRef = useRef<any>(null);
  const [selectCoordinate, setselectCoordinate] = useState<CoodrinateType>();
  const [showItems, setshowItems] = useState<boolean>(false);
  const [localOptions, setlocalOptions] = useState(options);
  const [localValue, setlocalValue] = useState<OptionType[] | []>(
    values ? values : []
  );

  //GET BOUNDARY COORDINATE OF SELECT BOX - IF WE SELECT MULTIPLE ITEMS AND IT GET BIGGER THEN IT WILL TAKE MORE HEIGHT (FOR CHANGE INITIAL POSITION OF ITEM SELECTIONS)
  useEffect(() => {
    const coordinateBox = selectRef.current.getBoundingClientRect();
    setselectCoordinate(coordinateBox);
  }, [localValue.length]);

  //SCROLL
  useEffect(() => {
    if (showItems) {
      const getBodyCoordinate: any = document.querySelector("body");
      if (getBodyCoordinate?.scrollHeight > getBodyCoordinate?.clientHeight) {
        window.scrollTo(0, getBodyCoordinate?.scrollHeight);
      }
    }
  }, [showItems]);

  //SELECT AN ITEM FROM DROPDOWN --- IT WILL REMOVE AN ITEM FROM SELECTION LIST AND ADD AN ITEM TO SELECTED LIST AND ALSO PASS TO onSelect FUNCTION TO GET IN ITS PARENT ELEMENT
  const itemSelectHandler = (e: OptionType): void => {
    let newValues: OptionType[] = [];
    newValues = [
      ...localValue,
      {
        label: e.label,
        value: e.value,
      },
    ];
    setlocalValue(newValues);
    setlocalOptions([...localOptions.filter((el) => el.value !== e.value)]);
    setshowItems(false);
    onSelect(newValues);
  };

  //DELETE AN ITEM FROM SELECTED LIST---ADD THAT ITEM TO SELECTION LIST---SEND TO onSelect FUNCTION TO GET IN ITS PARENT ELEMENT
  const deleteItemHandler = (el: OptionType) => {
    setshowItems((prev) => !prev);
    const filteredValues = [
      ...localValue.filter((item: OptionType) => item.value !== el.value),
    ];
    setlocalOptions([...localOptions, el]);
    setlocalValue(filteredValues);
    onSelect(filteredValues);
  };

  //CLOSE SELECTION LIST WHEN WE CLICK OUTSIDE OF IT!
  const clickOutside = useCallback((e: MouseEvent): void => {
    if (selectRef?.current.contains(e.target)) {
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
    <div
      className="relative max-w-xs"
      {...rest}
      ref={selectRef}
      onClick={() => setshowItems((prev) => !prev)}
    >
      <div className="flex flex-wrap items-center cursor-pointer overflow-x-hidden  border rounded-md">
        {localValue?.length > 0 ? (
          localValue?.map((el: OptionType, index: number) => (
            <div
              className="m-1 flex items-center flex-nowrap flex-shrink-0 bg-slate-300 hover:text-slate-500 rounded pr-1 overflow-hidden"
              key={`${el.label}-value-${index}`}
            >
              {" "}
              <div
                className="flex h-full items-center px-1  text-red-400 cursor-pointer hover:bg-red-500 hover:text-slate-300"
                onClick={() => deleteItemHandler(el)}
              >
                x
              </div>
              <Typography variant="small" className="text-xs">
                {el.label}
              </Typography>
            </div>
          ))
        ) : (
          <Typography className="p-1 mx-0.5">Selected</Typography>
        )}
      </div>
      {selectCoordinate && (
        <div
          className="absolute left-0 w-full flex flex-col shadow-md z-50"
          style={{ top: selectCoordinate.height }}
        >
          {showItems &&
            localOptions.length > 0 &&
            localOptions.map((el: OptionType, index: number) => (
              <div
                className="px-4 py-2 text-sm cursor-pointer bg-slate-50 hover:bg-slate-200 "
                key={`${el.label}-${index}`}
                onClick={() => itemSelectHandler(el)}
              >
                {el.label}
              </div>
            ))}
          {showItems && localOptions.length === 0 && (
            <div className="px-4 py-2 text-sm cursor-pointer bg-slate-50">
              No Item
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMulti;
