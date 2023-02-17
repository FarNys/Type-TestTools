import React, { useState, useEffect } from "react";
import headerData from "../../data/db.json";
import SingleTr from "./SingleTr";
import { TableTd, TableTh } from "./types";

const Sheet = () => {
  const [refactorData, setrefactorData] = useState<any>([]);
  const [refactorheader, setrefactorheader] = useState<any>([]);
  const tableHeader: TableTh[] = headerData.header;
  const tableData: TableTd[] = headerData.tableData;

  useEffect(() => {
    setrefactorheader([
      ...tableHeader.map((el, index) => {
        return {
          col: index,
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

  console.log(refactorData);
  console.log(refactorheader);

  return (
    <div className="w-full border mt-4">
      {refactorData && refactorheader && (
        <table className="border">
          <thead>
            <tr>
              {refactorheader.map((el: any) => (
                <td
                  className="p-2 border bg-slate-100"
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
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Sheet;
