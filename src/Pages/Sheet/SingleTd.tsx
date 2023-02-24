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
    setselectedList([]);
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
  };

  const mouseEnterHandler = () => {
    if (isMouseDown) {
      setselectedList([
        selectedList[0],
        {
          header: item,
          data: el,
        },
      ]);
    }
  };

  const mouseUpHandler = () => {
    setisMouseDown(false);
    console.log(selectedList);
  };

  return (
    <td
      className="p-1 border select-none"
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseEnter={mouseEnterHandler}
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
