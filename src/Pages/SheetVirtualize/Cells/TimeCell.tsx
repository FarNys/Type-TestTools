import React, { useRef } from "react";
import { TableTdRefactored } from "../types";
import { changeSheetData } from "../redux/sheetSlice";
import { useDispatch } from "react-redux";

const TimeCell = ({ item, el }: any) => {
  const inputRef = useRef<any>(null);
  const dispatch = useDispatch();
  const inputValueHandler = (e: any) => {
    dispatch(
      changeSheetData({
        data: {
          row: el.row,
          col: item.col,
          keyField: item.keyField,
          data: e.target.value,
        },
      })
    );
  };
  return (
    <input
      ref={inputRef}
      autoFocus={true}
      defaultValue={el[item.keyField as keyof TableTdRefactored]}
      onChange={inputValueHandler}
      type="time"
      // placeholder="PlaceHolder"
      className="absolute top-0 left-0 w-full p-1 outline outline-2 outline-blue-500 h-[calc(40px-1px)]"
    />
  );
};

export default TimeCell;
