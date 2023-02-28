import React from "react";

import GridVirtualize from "./GridVirtualize";
import TableVirtualize from "./TableVirtualize";

const Virtualize = () => {
  return (
    <div>
      <h3>GRID</h3>
      <GridVirtualize />
      {/* <TableVirtualize /> */}
    </div>
  );
};

export default Virtualize;
