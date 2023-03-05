import React from "react";
import { useDispatch } from "react-redux";
import { changeSheetData } from "../redux/sheetSlice";
import { TableTdRefactored } from "../types";

const SelectCell = ({ style, el, item }: any) => {
  const dispatch = useDispatch();
  const changeSelectHandler = (e: any) => {
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
    <select
      onChange={changeSelectHandler}
      className="w-full p-1 border outline outline-2 outline-blue-500 h-[calc(40px-1px)]"
      defaultValue={el[item.keyField as keyof TableTdRefactored]}
    >
      <option value=""></option>
      <option value="lego">Lego</option>
      <option value="Vite">Vite</option>
      <option value="Sedr">Sedr</option>
    </select>
  );
};

export default SelectCell;
