import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";

const TableVirtualize = () => {
  const parentRef = React.useRef<any>();

  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: 100,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  return (
    <>
      <div
        className="List mt-6 ml-6"
        style={{
          height: `500px`,
          width: `500px`,
          overflow: "auto",
        }}
      >
        <table>
          <thead>
            <tr>
              <td>ROW</td>
            </tr>
          </thead>
        </table>
        <tbody
          ref={parentRef}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,

            width: `${columnVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <tr key={virtualRow.index}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                <td
                  key={virtualColumn.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${virtualColumn.size}px`,
                    height: `${virtualRow.size}px`,
                    transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                  }}
                >
                  Cell {virtualRow.index}, {virtualColumn.index}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </div>
    </>
  );
};

export default TableVirtualize;
