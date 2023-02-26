import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeCellSelectHandler,
  activeMouseDown,
  deActiveMouseDown,
  selectRectDataHandler,
  selectRectInitialHandler,
} from "./redux/sheetSlice";
import { RootState } from "./redux/sheetStore";
import { TableTdRefactored, TableThRefactored } from "./types";

interface SingleTdType {
  el: TableTdRefactored;
  item: TableThRefactored;
}

const SingleTd = ({ el, item }: SingleTdType) => {
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
  const [isCellActive, setisCellActive] = useState(false);

  const mouseDownHandler = () => {
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
      // setselectedList([
      //   selectedList[0],
      //   {
      //     header: item,
      //     data: el,
      //   },
      // ]);
    }
  };

  const isCellSelected = useCallback(() => {
    if (activeCell?.el.row === +el.row && activeCell.item.col === +item.col) {
      return "outline outline-1 outline-sky-500";
    }
    return "";
  }, [activeCell]);

  const mouseUpHandler = () => {
    dispatch(deActiveMouseDown());

    // if(firstCell.current.header.col!==)
  };

  const doubleClickHandler = () => {
    setisCellActive(true);
    // console.log("Active");
  };
  if (isCellActive)
    return (
      <td>
        <input className="p-1 w-full h-full" />
      </td>
    );

  return (
    <td
      className={`p-1 border select-none  ${isCellSelected()}`}
      onDoubleClick={doubleClickHandler}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseEnter={mouseEnterHandler}
      style={{
        maxWidth: item.width,
        width: item.width,
        height: "40px",
      }}
    >
      {el[item.keyField as keyof TableTdRefactored]}
    </td>
  );
};

export default SingleTd;
