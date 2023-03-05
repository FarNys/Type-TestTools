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
  deActiveCellEditMode,
  deleteCellHandler,
  enterKeyHandler,
  hideDisplayRect,
  refactorDataHandler,
  refactorHeaderHandler,
  removeActiveCell,
  setEditModeCell,
  showDisplayRect,
  updateSheetData,
} from "./redux/sheetSlice";
import { RootState } from "./redux/sheetStore";
import { ALPHABET_KEYS, ARROW_KEYS } from "./constant";
import SheetVirPart from "./SheetVirPart";

const Sheet = () => {
  const dispatch = useDispatch();
  const activeCell = useSelector(
    (state: RootState) => state.sheetSlice.activeCell
  );
  // const selectedRectData = useSelector(
  //   (state: RootState) => state.sheetSlice.selectedRectData
  // );
  // const activeCell = useSelector(
  //   (state: RootState) => state.sheetSlice.activeCell
  // );

  // const cellInEditMode = useSelector(
  //   (state: RootState) => state.sheetSlice.cellInEditMode
  // );
  const afterUpdateData = useSelector(
    (state: RootState) => state.sheetSlice.afterUpdateData
  );

  const dragStartRef = useRef<TableTh | any>(null);
  const dragEndRef = useRef<TableTh | any>(null);
  const refactorheader = useSelector(
    (state: RootState) => state.sheetSlice.refactorheader
  );
  const refactorData = useSelector(
    (state: RootState) => state.sheetSlice.refactorData
  );
  // const isDisplayRect = useSelector(
  //   (state: RootState) => state.sheetSlice.isDisplayRect
  // );
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
    let emptyList = [];
    for (let i = 0; i < 10000; i++) {
      const x = {
        row: i,
        name: "Element",
        lastname: "Tera",
        number: i,
        email: "Golden@example.com",
        content: "Content",
        property: "property" + i,
      };
      emptyList.push(x);
    }
    dispatch(refactorDataHandler({ data: emptyList }));
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

  const keyboardEventHandler = useCallback(
    async (e: KeyboardEvent) => {
      // console.log(activeCell);
      // if (!activeCell) return;
      // if (ALPHABET_KEYS.includes(e.keyCode) && activeCell) {
      //   return console.log("KEY PRESS");
      // }
      if (!activeCell) return;
      console.log(e.keyCode);

      if (e.keyCode === 46) {
        return dispatch(deleteCellHandler());
      }
      //FOR COPY SINGLE CELL
      if (e.ctrlKey && e.keyCode === 67 && activeCell) {
        try {
          await navigator.clipboard.writeText(
            activeCell.el[activeCell.item.keyField]
          );
        } catch (error) {
          console.log(error);
        }
      }
      if (!e.ctrlKey && !e.altKey) {
        dispatch(hideDisplayRect({ ref: rectRef }));
        if (e.keyCode === 13) {
          dispatch(enterKeyHandler());
          return dispatch(updateSheetData({}));
          // return dispatch(setEditModeCell());
        }
        if (ARROW_KEYS.includes(e.keyCode)) {
          dispatch(changeActiveCEllByArrow({ code: e.keyCode }));
          return dispatch(updateSheetData({}));
        }
      }
      return;
    },
    [dispatch, activeCell]
  );
  console.log(activeCell);
  useEffect(() => {
    document.addEventListener("keydown", keyboardEventHandler);
    return () => document.removeEventListener("keydown", keyboardEventHandler);
  }, [keyboardEventHandler]);

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

  // useEffect(() => {
  //   if (selectedRectData) {
  //     console.log(selectedRectData);
  //   }
  // }, [selectedRectData]);

  // useOnClickOutside(tableRef, () => {
  //   dispatch(hideDisplayRect({ ref: rectRef }));
  //   dispatch(removeActiveCell());
  //   dispatch(deActiveCellEditMode());
  //   dispatch(updateSheetData({}));
  // });

  useEffect(() => {
    if (afterUpdateData) {
      console.log(afterUpdateData);
    }
  }, [afterUpdateData]);
  console.count("Render");

  return (
    <div className="w-full border mt-4">
      <h1>Sheet Virtualize</h1>
      <div className="w-full relative">
        {refactorData && refactorheader && (
          <React.Fragment>
            <table className="border" ref={tableRef}>
              <thead>
                <tr>
                  {/* <td className="px-1 border bg-slate-100 h-10 ">row</td> */}
                  {refactorheader.map((el: any) => (
                    <td
                      className=" border bg-slate-100 h-10 "
                      style={{ width: el.width, minWidth: el.width }}
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

              {/* <tbody>
              {refactorData.map((el: any, index: number) => (
                <SingleTr
                  key={`trow-${index}`}
                  refactorheader={refactorheader}
                  el={el}
                  index={index}
                  rectRef={rectRef}
                />
              ))}
            </tbody> */}
            </table>
            <SheetVirPart rectRef={rectRef} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Sheet;
