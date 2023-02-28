import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import SingleTd from "./SingleTdV";
import SingleTdV from "./SingleTdV";

const SheetVirPart = ({ refactorData, refactorheader }: any) => {
  const parentRef = React.useRef<HTMLDivElement | any>(null);
  const rowVirtualizer = useVirtualizer({
    count: refactorData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    // paddingStart: 200,
    // paddingEnd: 200,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: refactorheader.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    // paddingStart: 200,
    // paddingEnd: 200,
  });
  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        height: `400px`,
        width: `500px`,
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: `${columnVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          return (
            <React.Fragment key={virtualRow.index}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                // console.log(virtualColumn);
                // console.log(refactorheader[virtualRow.index]);
                return (
                  <SingleTdV
                    key={virtualColumn.index}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: `${virtualColumn.size}px`,
                      height: `${virtualRow.size}px`,
                      transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                    }}
                    el={refactorData[virtualRow.index]}
                    item={refactorheader[virtualColumn.index]}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SheetVirPart;