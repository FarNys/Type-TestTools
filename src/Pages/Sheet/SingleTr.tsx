import React from "react";
import SingleTd from "./SingleTd";
import { TableTh, TableTd } from "./types";
//

const SingleTr = ({ refactorheader, el }: any) => {
  console.log(refactorheader);
  return (
    <tr>
      {refactorheader.map((item: any, id: number) => (
        <SingleTd key={`td-${item}-${id}`} el={el} item={item} />
      ))}
    </tr>
  );
};

export default SingleTr;
