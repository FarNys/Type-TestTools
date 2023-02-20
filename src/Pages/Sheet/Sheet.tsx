import React, { useState, useEffect, useRef } from "react";
import headerData from "../../data/db.json";
import SingleTr from "./SingleTr";
import { TableTd, TableTh } from "./types";

const Sheet = () => {
  const [isMouseDown, setisMouseDown] = useState<Boolean>(false);
  const tableRef = useRef<any>(null);
  const rectRef = useRef<any>(null);
  const [selectedList, setselectedList] = useState([]);
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
      rectRef.current.style.top = `${(findMinRow + 1) * 40}px`;
      rectRef.current.style.left = `${findMinCol * 150}px`;
      rectRef.current.style.width = `${(findMaxCol - findMinCol + 1) * 150}px`;
      rectRef.current.style.height = `${40 + (findMaxRow - findMinRow) * 40}px`;
    }
  }, [selectedList.length, isMouseDown]);

  useEffect(() => {
    if (!isMouseDown) {
      const findAllRow = selectedList.map((el: any) => el.data.row);
      const findAllCol = selectedList.map((el: any) => el.header.col);
      const findMinRow = Math.min(...findAllRow);
      const findMaxRow = Math.max(...findAllRow);
      console.log(findMaxRow);
      const findMinCol = Math.min(...findAllCol);
      const findMaxCol = Math.max(...findAllCol);
      const resHeader = refactorheader.slice(findMinCol, findMaxCol + 1);
      const result = refactorData.slice(findMinRow, findMaxRow + 1);
      const final = result.map((el: any, index: number) =>
        resHeader.map((item: any) => {
          return {
            item: el[item.keyField],
            rowId: findMinRow + index,
          };
        })
      );
      console.log(final);
    }
  }, [isMouseDown]);

  const mouseUpHandler = () => {
    setisMouseDown(false);
  };

  return (
    <div className="w-full border mt-4">
      <div className="w-full relative">
        <div
          id="selection-rect "
          className="absolute border border-sky-700  bg-sky-400 opacity-60 -z-10"
          ref={rectRef}
          onMouseUp={mouseUpHandler}
        ></div>
        {refactorData && refactorheader && (
          <table className="border" ref={tableRef}>
            <thead>
              <tr>
                {refactorheader.map((el: any) => (
                  <td
                    className="px-1 border bg-slate-100 h-10"
                    key={`thead-${el.keyField}`}
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
                  isMouseDown={isMouseDown}
                  setisMouseDown={setisMouseDown}
                  selectedList={selectedList}
                  setselectedList={setselectedList}
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
