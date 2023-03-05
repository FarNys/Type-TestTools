import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeCellSelectHandler,
  activeMouseDown,
  changeSheetData,
  deActiveMouseDown,
  hideDisplayRect,
  hideRect,
  selectRectDataHandler,
  selectRectInitialHandler,
  setEditModeCell,
  updateSheetData,
} from "./redux/sheetSlice";
import { RootState } from "./redux/sheetStore";
import { TableTdRefactored, TableThRefactored } from "./types";
import SelectCell from "./Cells/SelectCell";
import BaseCell from "./Cells/BaseCell";

interface SingleTdVType {
  el: TableTdRefactored;
  item: TableThRefactored;
  style: any;
}

const SingleTdV = memo(({ el, item, style }: SingleTdVType) => {
  const dispatch = useDispatch();
  const activeCell = useSelector(
    (state: RootState) => state.sheetSlice.activeCell
  );
  const isMouseDown = useSelector(
    (state: RootState) => state.sheetSlice.isMouseDown
  );
  const selectedList = useSelector(
    (state: RootState) => state.sheetSlice.selectedList
  );
  const cellInEditMode = useSelector(
    (state: RootState) => state.sheetSlice.cellInEditMode
  );
  const mouseDownHandler = () => {
    if (
      activeCell &&
      activeCell.el.row === el.row &&
      activeCell.item.col === item.col
    ) {
      dispatch(setEditModeCell());
      dispatch(hideRect());
    } else {
      dispatch(
        activeCellSelectHandler({
          data: {
            el,
            item,
          },
        })
      );
      dispatch(activeMouseDown());
      dispatch(
        selectRectDataHandler({
          data: {
            header: item,
            data: el,
          },
        })
      );
    }
  };
  const mouseEnterHandler = () => {
    if (isMouseDown) {
      dispatch(
        selectRectInitialHandler({
          initialValue: selectedList[0],
          data: {
            header: item,
            data: el,
          },
        })
      );
    }
  };
  const isCellSelected = useCallback(() => {
    if (activeCell?.el.row === el.row && activeCell.item.col === item.col) {
      return "outline outline-1 outline-sky-500 z-10";
    }
    return "border border-slate-200";
  }, [activeCell, el.row, item.col]);
  const mouseUpHandler = () => {
    dispatch(deActiveMouseDown());

    // if(firstCell.current.header.col!==)
  };

  const doubleClickHandler = () => {
    // console.log("Active");
  };

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

  const bgColorPicker = (value: any) => {
    const findNumber = value.split("%");
    if (findNumber.length === 0) return "";
    if (findNumber[0] > 50) return "bg-green-500/40";
    if (+findNumber[0] < 50) return "bg-red-500/40";
    return "bg-red-500/10";
  };

  if (
    cellInEditMode &&
    cellInEditMode.el.row === el.row &&
    cellInEditMode.item.col === item.col
  ) {
    return (
      <div className="select-none z-10 shadow-lg" style={style}>
        <BaseCell item={item} el={el} />
      </div>
    );
  }
  if (item.type === 6)
    return (
      <div
        className={`p-1 flex items-center cursor-cell select-none h-10 ${isCellSelected()} overflow-hidden ${bgColorPicker(
          el[item.keyField as keyof TableTdRefactored]
        )}`}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseEnter={mouseEnterHandler}
        style={style}
      >
        {el[item.keyField as keyof TableTdRefactored]}
      </div>
    );

  return (
    <div
      className={`p-1 box-border  flex items-center cursor-cell select-none h-10 ${isCellSelected()} overflow-hidden`}
      // onDoubleClick={doubleClickHandler}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseEnter={mouseEnterHandler}
      style={{
        ...style,
      }}
    >
      {el[item.keyField as keyof TableTdRefactored]}
    </div>
  );
});

export default SingleTdV;
