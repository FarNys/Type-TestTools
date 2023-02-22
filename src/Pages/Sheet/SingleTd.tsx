import React from "react";

const SingleTd = ({
  el,
  item,
  isMouseDown,
  setisMouseDown,
  selectedList,
  setselectedList,
  firstCell,
}: any) => {
  const mouseDownHandler = () => {
    setisMouseDown(true);
    firstCell.current = {
      header: item,
      data: el,
    };
    setselectedList([
      {
        header: item,
        data: el,
      },
    ]);
    // console.log("RUN MOUSE DOWN");
  };
  const mouseOverHandler = () => {
    if (isMouseDown) {
      setselectedList([
        ...selectedList,
        {
          header: item,
          data: el,
        },
      ]);
      // console.log("MOUSE OVER Z");
    }
  };

  const mouseUpHandler = () => {
    setisMouseDown(false);
  };

  const mouseLeaveHandler = () => {
    if (isMouseDown) {
      if (
        el.row === selectedList[0].data.row &&
        item.col === selectedList[0].header.col
      ) {
        console.log("FIRST CELL");
        return;
      }
      console.log("NOT FIRST CELL");
      console.log(el, item);
      // setselectedList([
      //   ...selectedList.filter(
      //     (list: any) =>
      //       list.header.col === item.col && list.data.row === el.row
      //   ),
      // ]);
    }
  };
  return (
    <td
      className="p-1 border select-none"
      onMouseDown={mouseDownHandler}
      onMouseOver={mouseOverHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseLeaveHandler}
      style={{
        maxWidth: item.width,
        width: item.width,
        height: "40px",
      }}
    >
      {el[item.keyField]}
    </td>
  );
};

export default SingleTd;
