import React from "react";

const SingleTd = ({
  el,
  item,
  isMouseDown,
  setisMouseDown,
  selectedList,
  setselectedList,
}: any) => {
  const mouseDownHandler = () => {
    setisMouseDown(true);
    setselectedList([
      {
        header: item,
        data: el,
      },
    ]);
    console.log("RUN MOUSE DOWN");
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
      console.log("MOUSE OVER Z");
    }
  };

  const mouseUpHandler = () => {
    setisMouseDown(false);
  };
  return (
    <td
      className="p-1 border select-none"
      onMouseDown={mouseDownHandler}
      onMouseOver={mouseOverHandler}
      onMouseUp={mouseUpHandler}
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
