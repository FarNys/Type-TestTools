import React, { useState, useEffect, useRef } from "react";
import headerData from "../../data/db.json";
import SingleTr from "./SingleTr";
import { TableTd, TableTh } from "./types";

const Sheet = () => {
  const [isMouseDown, setisMouseDown] = useState<Boolean>(false);
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
      rectRef.current.style.width = `${(findMaxCol + 1) * 150}px`;
      rectRef.current.style.height = `${40 + findMaxRow * 40}px`;
    }
  }, [selectedList, isMouseDown]);

  const mouseUpHandler = () => {
    setisMouseDown(false);
  };

  return (
    <div className="w-full border mt-4">
      <div className="w-full relative">
        {refactorData && refactorheader && (
          <table className="border">
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
        <div
          id="selection-rect "
          className="absolute border border-sky-500  bg-sky-200 opacity-20"
          ref={rectRef}
          onMouseUp={mouseUpHandler}
        ></div>
      </div>
    </div>
  );
};

export default Sheet;
