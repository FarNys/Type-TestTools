import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { TableTdRefactored } from "../types";
import { changeSheetData } from "../redux/sheetSlice";

const CheckboxCell = ({ item, el }: any) => {
  const inputRef = useRef<any>(null);
  const dispatch = useDispatch();

  const inputValueHandler = (e: any) => {
    dispatch(
      changeSheetData({
        data: {
          row: el.row,
          col: item.col,
          keyField: item.keyField,
          data: e.target.checked ? "true" : "false",
        },
      })
    );
  };

  return (
    <div className="border-2 border-blue-500 w-full flex justify-center items-center h-10  z-10">
      <input
        ref={inputRef}
        autoFocus={true}
        defaultChecked={
          el[item.keyField as keyof TableTdRefactored] === "true" ? true : false
        }
        onChange={inputValueHandler}
        type="checkbox"
        // placeholder="PlaceHolder"
        className=" w-5 p-1 border h-5"
      />
    </div>
  );
};

export default CheckboxCell;
