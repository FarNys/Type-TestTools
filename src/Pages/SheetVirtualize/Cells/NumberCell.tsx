import React, { useEffect, useRef } from "react";
import { TableTdRefactored } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { changeSheetData } from "../redux/sheetSlice";
import { RootState } from "../redux/sheetStore";

const NumberCell = ({ item, el }: any) => {
  const cellInEditMode = useSelector(
    (state: RootState) => state.sheetSlice.cellInEditMode
  );
  const inputRef = useRef<any>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let interval: any;
    if (
      cellInEditMode &&
      cellInEditMode.el.row === el.row &&
      cellInEditMode.item.col === item.col
    ) {
      interval = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
    return () => clearInterval(interval);
  }, [cellInEditMode]);

  const inputValueHandler = (e: any) => {
    dispatch(
      changeSheetData({
        data: {
          row: el.row,
          col: item.col,
          keyField: item.keyField,
          data: e.target.valueAsNumber,
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
      type="number"
      placeholder="Number Cell"
      className="w-full p-1 outline outline-2 outline-blue-500 h-[calc(40px-1px)]"
    />
  );
};

export default NumberCell;
