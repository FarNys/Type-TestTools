import SingleTd from "./SingleTd";
import { useDispatch } from "react-redux";
import {
  createRect,
  removeActiveCell,
  showDisplayRect,
} from "./redux/sheetSlice";
import { TableTdRefactored, TableThRefactored } from "./types";
//
interface SingleTrType {
  refactorheader: TableThRefactored[];
  el: TableTdRefactored;
  index: number;
  rectRef: HTMLDivElement | any;
}

const SingleTr = ({ refactorheader, el, index, rectRef }: SingleTrType) => {
  const dispatch = useDispatch();
  const mouseDownHeaderHandler = () => {
    dispatch(
      createRect({
        ref: rectRef,
        minCol: 0,
        maxCol: refactorheader.length,
        minRow: el.row,
        maxRow: el.row + 1,
      })
    );
    dispatch(showDisplayRect());
    dispatch(removeActiveCell());
  };

  return (
    <tr>
      <td
        className="p-1 border select-none outline-1 hover:cursor-pointer"
        onMouseDown={mouseDownHeaderHandler}
      >
        {index + 1}
      </td>
      {refactorheader.map((item: TableThRefactored, id: number) => (
        <SingleTd key={`td-${item}-${id}`} el={el} item={item} />
      ))}
    </tr>
  );
};

export default SingleTr;
