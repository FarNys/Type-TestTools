import React, { useState, useEffect, useRef, useCallback } from "react";
import headerData from "../../data/db.json";
import { useOnClickOutside } from "../../Hooks/useOnClickOutside";
import SingleTr from "./SingleTr";
import { TableTd, TableTh } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  calcSelectedRectData,
  changeActiveCEllByArrow,
  changeColPosHandler,
  changeReverseColPosHandler,
  createRect,
  goNextRow,
  hideDisplayRect,
  refactorDataHandler,
  refactorHeaderHandler,
  removeActiveCell,
  showDisplayRect,
} from "./redux/sheetSlice";
import { RootState } from "./redux/sheetStore";

const Sheet = () => {
  const dispatch = useDispatch();
  const selectedRectData = useSelector(
    (state: RootState) => state.sheetSlice.selectedRectData
  );
  const dragStartRef = useRef<TableTh | any>(null);
  const dragEndRef = useRef<TableTh | any>(null);
  const refactorheader = useSelector(
    (state: RootState) => state.sheetSlice.refactorheader
  );
  const refactorData = useSelector(
    (state: RootState) => state.sheetSlice.refactorData
  );
  const isDisplayRect = useSelector(
    (state: RootState) => state.sheetSlice.isDisplayRect
  );
  const isMouseDown = useSelector(
    (state: RootState) => state.sheetSlice.isMouseDown
  );
  const selectedList = useSelector(
    (state: RootState) => state.sheetSlice.selectedList
  );
  const tableRef = useRef<any>(null);
  const rectRef = useRef<any>(null);

  const [dragEnterItem, setdragEnterItem] = useState<any | TableTh>(null);
  // const [selectedList, setselectedList] = useState([]);
  const tableHeader: TableTh[] = headerData.header;
  const tableData: TableTd[] = headerData.tableData;
  useEffect(() => {
    dispatch(refactorHeaderHandler({ header: tableHeader }));
  }, [tableHeader, dispatch]);

  useEffect(() => {
    dispatch(refactorDataHandler({ data: tableData }));
  }, [tableData, dispatch]);

  useEffect(() => {
    if (selectedList.length > 1 && isMouseDown) {
      const findAllRow = selectedList.map((el: any) => el.data.row);
      const findAllCol = selectedList.map((el: any) => el.header.col);
      const findMinRow = Math.min(...findAllRow);
      const findMaxRow = Math.max(...findAllRow);
      const findMinCol = Math.min(...findAllCol);
      const findMaxCol = Math.max(...findAllCol);

      dispatch(
        createRect({
          ref: rectRef,
          minCol: findMinCol,
          maxCol: findMaxCol + 1,
          minRow: findMinRow,
          maxRow: findMaxRow + 1,
        })
      );
      dispatch(showDisplayRect());
      // rectRef.current.style.top = `${(findMinRow + 1) * 40}px`;
      // rectRef.current.style.left = `${findMinCol * 150}px`;
      // rectRef.current.style.width = `${(findMaxCol - findMinCol + 1) * 150}px`;
      // rectRef.current.style.height = `${40 + (findMaxRow - findMinRow) * 40}px`;
    } else {
      if (isMouseDown) {
        dispatch(hideDisplayRect({ ref: rectRef }));
        // rectRef.current.style.width = 0;
        // rectRef.current.style.height = 0;
        // setdisplayRect(false);
      }
    }
  }, [selectedList, isMouseDown, dispatch]);

  const keyboardEventHandler = useCallback(
    (e: KeyboardEvent) => {
      dispatch(hideDisplayRect({ ref: rectRef }));
      if (e.keyCode === 13) {
        return dispatch(goNextRow());
      }
      return dispatch(changeActiveCEllByArrow({ code: e.keyCode }));
    },
    [dispatch]
  );

  const mouseUpHeaderHandler = (element: any) => {
    dispatch(showDisplayRect());
    dispatch(removeActiveCell());
    dispatch(
      createRect({
        ref: rectRef,
        minCol: element.col,
        maxCol: element.col + 1,
        minRow: 0,
        maxRow: refactorData.length,
      })
    );
  };

  useEffect(() => {
    if (!isMouseDown && selectedList.length > 0) {
      dispatch(calcSelectedRectData());
    }
  }, [selectedList, isMouseDown, dispatch]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => keyboardEventHandler(e));
    return () =>
      document.removeEventListener("keydown", (e) => keyboardEventHandler(e));
  }, [keyboardEventHandler]);

  useOnClickOutside(tableRef, () => {
    dispatch(hideDisplayRect({ ref: rectRef }));
    dispatch(removeActiveCell());
  });

  const dragStartHandler = (element: TableTh) => {
    dragStartRef.current = element;
    dispatch(hideDisplayRect({ ref: rectRef }));
    dispatch(removeActiveCell());
  };
  const dragEnterHandler = (element: TableTh) => {
    setdragEnterItem(element);
    dragEndRef.current = element;
  };
  const dragEndHandler = () => {
    const startDragCol = dragStartRef.current;
    const endDragCol = dragEndRef.current;
    if (startDragCol.col === endDragCol.col) {
      dragStartRef.current = null;
      setdragEnterItem(null);
      return;
    }
    if (endDragCol.col > startDragCol.col) {
      dispatch(
        changeColPosHandler({
          start: startDragCol.col,
          end: endDragCol.col,
        })
      );
    } else {
      dispatch(
        changeReverseColPosHandler({
          start: startDragCol.col,
          end: endDragCol.col,
        })
      );
    }
    dragStartRef.current = null;
    setdragEnterItem(null);
  };

  useEffect(() => {
    if (selectedRectData) {
      console.log(selectedRectData);
    }
  }, [selectedRectData]);

  return (
    <div className="w-full border mt-4">
      <div className="w-full relative">
        <div
          id="selection-rect "
          className="absolute outline outline-2 outline-sky-500  bg-sky-500/10 pointer-events-none duration-100"
          ref={rectRef}
          style={{ display: isDisplayRect ? "block" : "none" }}
        ></div>
        {refactorData && refactorheader && (
          <table className="border" ref={tableRef}>
            <thead>
              <tr>
                <td className="px-1 border bg-slate-100 h-10 ">row</td>
                {refactorheader.map((el: any) => (
                  <td
                    className=" border bg-slate-100 h-10 "
                    key={`thead-${el.keyField}`}
                  >
                    <div className="flex h-full w-full ">
                      <div
                        className={` w-full p-1 flex items-center cursor-grab ${
                          dragStartRef.current?.col === el.col
                            ? "bg-blue-200"
                            : "bg-slate-100"
                        } ${
                          dragEnterItem?.col === el.col
                            ? "bg-green-200"
                            : "bg-slate-100"
                        }`}
                        onMouseUp={() => mouseUpHeaderHandler(el)}
                        onDragStart={() => dragStartHandler(el)}
                        onDragEnter={() => dragEnterHandler(el)}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnd={dragEndHandler}
                        draggable
                      >
                        {el.title}
                      </div>
                      {/* <div
                        className={`w-1 h-full hover:bg-slate-200 hover:cursor-w-resize`}
                        onMouseDown={mouseDownResizeHandler}
                      ></div> */}
                    </div>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {refactorData.map((el: any, index: number) => (
                <SingleTr
                  key={`tbody-${index}`}
                  refactorheader={refactorheader}
                  el={el}
                  index={index}
                  rectRef={rectRef}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Sheet;
