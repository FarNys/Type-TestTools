import React, { useRef, useEffect, useState } from "react";
import SingleTd from "./SingleTd";
import { TableTh, TableTd } from "./types";
//

const SingleTr = ({
  refactorheader,
  el,
  isMouseDown,
  setisMouseDown,
  selectedList,
  setselectedList,
  firstCell,
}: any) => {
  return (
    <tr>
      {refactorheader.map((item: any, id: number) => (
        <SingleTd
          key={`td-${item}-${id}`}
          el={el}
          item={item}
          isMouseDown={isMouseDown}
          setisMouseDown={setisMouseDown}
          selectedList={selectedList}
          setselectedList={setselectedList}
          firstCell={firstCell}
        />
      ))}
    </tr>
  );
};

export default SingleTr;
