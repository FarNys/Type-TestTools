import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/sheetStore";
import SingleTd from "./SingleTdV";
import SingleTdV from "./SingleTdV";
import {
  deActiveCellEditMode,
  hideDisplayRect,
  removeActiveCell,
  updateSheetData,
} from "./redux/sheetSlice";
import { useOnClickOutside } from "../../Hooks/useOnClickOutside";

const SheetVirPart = ({ rectRef }: any) => {
  const dispatch = useDispatch();
  const parentRef = React.useRef<HTMLDivElement | any>(null);
  const isDisplayRect = useSelector(
    (state: RootState) => state.sheetSlice.isDisplayRect
  );
  const refactorheader = useSelector(
    (state: RootState) => state.sheetSlice.refactorheader
  );
  const refactorData = useSelector(
    (state: RootState) => state.sheetSlice.refactorData
  );
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
    estimateSize: (index: any) => {
      const width = +refactorheader[index].width.split("px")[0];
      return width;
    },

    // paddingStart: 200,
    // paddingEnd: 200,
  });

  useOnClickOutside(parentRef, () => {
    dispatch(hideDisplayRect({ ref: rectRef }));
    dispatch(deActiveCellEditMode());
    dispatch(updateSheetData({}));
    dispatch(removeActiveCell());
  });

  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        height: "400px",
        width: refactorheader.length * 154 + "px",
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
        <div
          id="selection-rect "
          className="absolute outline outline-2 outline-sky-500  bg-sky-500/10 pointer-events-none duration-100 z-10"
          ref={rectRef}
          style={{ display: isDisplayRect ? "block" : "none" }}
        ></div>
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
