import React from "react";

const SingleTd = ({ el, item }: any) => {
  return <td className="p-1 border select-none">{el[item.keyField]}</td>;
};

export default SingleTd;
