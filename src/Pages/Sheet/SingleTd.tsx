import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeCellSelectHandler,
  activeMouseDown,
  deActiveMouseDown,
  selectRectDataHandler,
  selectRectInitialHandler,
} from "./redux/sheetSlice";

const SingleTd = ({ el, item, firstCell }: any) => {
  const dispatch = useDispatch();
  const activeCell = useSelector((state: any) => state.sheetSlice.activeCell);
  const isMouseDown = useSelector((state: any) => state.sheetSlice.isMouseDown);
  const selectedList = useSelector(
    (state: any) => state.sheetSlice.selectedList
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

    // setselectedList([]);
    // setisMouseDown(true);
    dispatch(activeMouseDown());
    firstCell.current = {
      header: item,
      data: el,
    };
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
      className={`p-1 border select-none outline-1 ${isCellSelected()}`}
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
      {el[item.keyField]}
    </td>
  );
};

export default SingleTd;
