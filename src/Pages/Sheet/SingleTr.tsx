import React, { useRef, useEffect, useState } from "react";
import SingleTd from "./SingleTd";
import { TableTh, TableTd } from "./types";
import { useDispatch } from "react-redux";
import { createRect, showDisplayRect } from "./redux/sheetSlice";
//

const SingleTr = ({ refactorheader, el, firstCell, index, rectRef }: any) => {
  const dispatch = useDispatch();
  const mouseDownHandler = () => {
    dispatch(
      createRect({
        ref: rectRef,
        minCol: 0,
        maxCol: refactorheader.length,
        minRow: el.row,
        maxRow: el.row + 1,
      })
    );
    dispatch(showDisplayRect());
  };
  return (
    <tr>
      <td
        className="p-1 border select-none outline-1"
        onMouseDown={mouseDownHandler}
      >
        {index + 1}
      </td>
      {refactorheader.map((item: any, id: number) => (
        <SingleTd
          key={`td-${item}-${id}`}
          el={el}
          item={item}
          firstCell={firstCell}
        />
      ))}
    </tr>
  );
};

export default SingleTr;
