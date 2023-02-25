import React, { useState, useEffect, useRef, useCallback } from "react";
import headerData from "../../data/db.json";
import { useOnClickOutside } from "../../Hooks/useOnClickOutside";
import SingleTr from "./SingleTr";
import { TableTd, TableTh } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveCEllByArrow,
  createRect,
  goNextRow,
  hideDisplayRect,
  removeActiveCell,
  showDisplayRect,
} from "./redux/sheetSlice";

const Sheet = () => {
  const dispatch = useDispatch();
  const isDisplayRect = useSelector(
    (state: any) => state.sheetSlice.isDisplayRect
  );
  const isMouseDown = useSelector((state: any) => state.sheetSlice.isMouseDown);
  const selectedList = useSelector(
    (state: any) => state.sheetSlice.selectedList
  );
  // const [isMouseDown, setisMouseDown] = useState<Boolean>(false);
  const firstCell = useRef<any>(null);
  const tableRef = useRef<any>(null);
  const rectRef = useRef<any>(null);
  // const [selectedList, setselectedList] = useState([]);
  const [refactorData, setrefactorData] = useState<any>([]);
  const [refactorheader, setrefactorheader] = useState<any>([]);
  const tableHeader: TableTh[] = headerData.header;
  const tableData: TableTd[] = headerData.tableData;
  useEffect(() => {
    setrefactorheader([
      ...tableHeader.map((el, index) => {
        return {
          col: index,
          width: "150px",
          ...el,
        };
      }),
    ]);
  }, [tableHeader]);

  useEffect(() => {
    setrefactorData([
      ...tableData.map((el, index) => {
        return {
          row: index,
          ...el,
        };
      }),
    ]);
  }, [tableData]);

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

  const mouseDownHeaderHandler = (element: any) => {
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
    document.addEventListener("keydown", (e) => keyboardEventHandler(e));
    return () =>
      document.removeEventListener("keydown", (e) => keyboardEventHandler(e));
  }, [keyboardEventHandler]);

  useOnClickOutside(tableRef, () => {
    dispatch(hideDisplayRect({ ref: rectRef }));
    dispatch(removeActiveCell());
  });

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
                <td className="px-1 border bg-slate-100 h-10">row</td>
                {refactorheader.map((el: any) => (
                  <td
                    className="px-1 border bg-slate-100 h-10"
                    key={`thead-${el.keyField}`}
                    onMouseDown={() => mouseDownHeaderHandler(el)}
                  >
                    {el.title}
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
                  firstCell={firstCell}
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
