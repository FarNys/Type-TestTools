import React from "react";
import TextCell from "./TextCell";
import SelectCell from "./SelectCell";
import DateCell from "./DateCell";
import CheckboxCell from "./CheckboxCell";
import NumberCell from "./NumberCell";
import SliderCell from "./SliderCell";
import TimeCell from "./TimeCell";

const BaseCell = ({ item, el }: any) => {
  if (item.type === 2) return <NumberCell item={item} el={el} />;
  if (item.type === 3) return <SelectCell item={item} el={el} />;
  if (item.type === 4) return <TimeCell item={item} el={el} />;
  // if (item.type === 4) return <DateCell item={item} el={el} />;
  if (item.type === 5) return <CheckboxCell item={item} el={el} />;
  if (item.type === 6) return <SliderCell item={item} el={el} />;
  return <TextCell item={item} el={el} />;
};

export default BaseCell;
