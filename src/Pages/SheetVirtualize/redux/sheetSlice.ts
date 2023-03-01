import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RectDataType,
  SelectedCell,
  TableTd,
  TableTdExtra,
  TableTdRefactored,
  TableTh,
  TableThExtra,
  TableThRefactored,
} from "../types";

//ALL TYPE DEFINITION

interface SliceParameterTypes {
  test: any;
  activeCell: any;
  isDisplayRect: Boolean;
  isMouseDown: Boolean;
  selectedList: SelectedCell[];
  refactorheader: TableThRefactored[];
  refactorData: TableTdRefactored[];
  selectedRectData: RectDataType | null | any;
  isMouseDownEdge: Boolean;
  cellInEditMode: any;
  updatedData: any[];
  afterUpdateData: any[];
}

// TYPE END
const initialState: SliceParameterTypes = {
  test: [],
  activeCell: null,
  isDisplayRect: false,
  isMouseDown: false,
  selectedList: [],
  refactorheader: [],
  refactorData: [],
  selectedRectData: null,
  isMouseDownEdge: false,
  cellInEditMode: null,
  updatedData: [],
  afterUpdateData: [],
};

const sheetSlice = createSlice({
  // A name, used in action types:
  name: "sheet",
  // The initial state:
  initialState,
  // An object of "case reducers".
  // Key names will be used to generate actions:
  reducers: {
    refactorHeaderHandler: (state, action) => {
      state.refactorheader = [
        ...action.payload.header.map((el: TableTh, index: number) => {
          return {
            col: index,
            width: "150px",
            ...el,
          };
        }),
      ];
    },
    refactorDataHandler: (state, action) => {
      state.refactorData = [
        ...action.payload.data.map((el: TableTd, index: number) => {
          return {
            row: index,

            ...el,
          };
        }),
      ];
    },
    activeMouseDown: (state) => {
      state.isMouseDown = true;
      state.selectedRectData = null;
    },
    deActiveMouseDown: (state) => {
      state.isMouseDown = false;
    },
    showDisplayRect: (state) => {
      state.isDisplayRect = true;
    },
    hideDisplayRect: (state, action) => {
      action.payload.ref.current.style.width = 0;
      action.payload.ref.current.style.height = 0;
      state.isDisplayRect = false;
      state.selectedRectData = null;
    },
    createRect: (state, action) => {
      action.payload.ref.current.style.top = `${
        (action.payload.minRow + 1) * 40
      }px`;
      action.payload.ref.current.style.left = `${
        action.payload.minCol * 150
      }px`;
      action.payload.ref.current.style.width = `${
        (action.payload.maxCol - action.payload.minCol) * 150
      }px`;
      action.payload.ref.current.style.height = `${
        40 + (action.payload.maxRow - action.payload.minRow - 1) * 40
      }px`;

      //SAME CODE IN calcSelectedRectData with a little Difference (>= --->  > & <= ---> <)
      const filteredHeader = state.refactorheader.filter(
        (el: any) =>
          el.col >= action.payload.minCol && el.col < action.payload.maxCol
      );
      const filteredData = state.refactorData.slice(
        action.payload.minRow,
        action.payload.maxRow
      );
      const finalData = filteredData.map((el: any) =>
        filteredHeader.map((item: any) => {
          return {
            col: item.col,
            row: el.row,
            data: el[item.keyField],
            keyField: item.keyField,
          };
        })
      );
      state.selectedRectData = {
        data: finalData,
        flatData: finalData.flat(),
      };
      return;
    },

    selectRectDataHandler: (state, action) => {
      state.selectedList = [action.payload.data];
      state.cellInEditMode = null;
    },
    selectRectInitialHandler: (state, action) => {
      state.selectedList = [action.payload.initialValue, action.payload.data];
    },

    activeCellSelectHandler: (state, action) => {
      state.activeCell = action.payload.data;
    },
    removeActiveCell: (state) => {
      state.activeCell = null;
    },
    enterKeyHandler: (state) => {
      const findRow = state.activeCell?.el.row;
      if (findRow || findRow === 0) {
        if (!state.cellInEditMode) {
          state.cellInEditMode = state.activeCell;
        } else {
          state.activeCell = {
            item: state.activeCell.item,
            el: { ...state.activeCell.el, row: findRow + 1 },
          };
          state.cellInEditMode = null;
        }
      }
    },
    changeActiveCEllByArrow: (state, action) => {
      const findRow = state.activeCell?.el.row;
      const findCol = state.activeCell?.item.col;
      const findArrow = action.payload.code;
      if (findRow || findRow === 0) {
        if (findCol || findCol === 0) {
          //LEFT ARROW
          if (findArrow === 37 && !state.cellInEditMode) {
            state.activeCell = {
              item: { ...state.activeCell.item, col: findCol - 1 },
              el: { ...state.activeCell.el },
            };
          }
          //RIGHT ARROW
          if (findArrow === 39 && !state.cellInEditMode) {
            state.activeCell = {
              item: { ...state.activeCell.item, col: findCol + 1 },
              el: { ...state.activeCell.el },
            };
          }
          //UP ARROW
          if (findArrow === 38) {
            // state.cellInEditMode = null;
            state.activeCell = {
              item: state.activeCell.item,
              el: { ...state.activeCell.el, row: findRow - 1 },
            };
            if (state.cellInEditMode) {
              state.cellInEditMode = state.activeCell;
            } else {
              state.cellInEditMode = null;
            }
          }
          //DOWN ARROW
          if (findArrow === 40) {
            // state.cellInEditMode = null;
            state.activeCell = {
              item: state.activeCell.item,
              el: { ...state.activeCell.el, row: findRow + 1 },
            };
            if (state.cellInEditMode) {
              state.cellInEditMode = state.activeCell;
            } else {
              state.cellInEditMode = null;
            }
          }
        }
      }
    },
    calcSelectedRectData: (state) => {
      const list = state.selectedList;
      if (list.length === 1) {
        const row = list[0].data.row;
        const col = list[0].header.col;
        const rowInList: TableTdRefactored[] = state.refactorData.slice(
          row,
          row + 1
        );
        const itemInRow = rowInList.map((el: TableTdRefactored) => {
          return {
            data: el[list[0].header.keyField as keyof TableTdRefactored],
          };
        });

        state.selectedRectData = {
          row,
          col,
          data: itemInRow[0].data,
          keyField: list[0].header.keyField,
        };

        // state.selectedRectData = {
        //   data: {
        //     col: itemInRow[0].col,
        //     row: itemInRow[0].row,
        //     data: itemInRow[0].data,
        //   },
        // };
      }
      if (list.length === 2) {
        let minRow: number;
        let maxRow: number;
        let minCol: number;
        let maxCol: number;
        const firstRow = list[0].data.row;
        const lastRow = list[1].data.row;
        const firstCol = list[0].header.col;
        const lastCol = list[1].header.col;
        if (firstRow > lastRow) {
          maxRow = firstRow;
          minRow = lastRow;
        } else {
          maxRow = lastRow;
          minRow = firstRow;
        }
        if (firstCol > lastCol) {
          maxCol = firstCol;
          minCol = lastCol;
        } else {
          maxCol = lastCol;
          minCol = firstCol;
        }
        const filteredHeader = state.refactorheader.filter(
          (el: TableThRefactored) => el.col >= minCol && el.col <= maxCol
        );
        const filteredData = state.refactorData.slice(minRow, maxRow + 1);
        const finalData = filteredData.map((el: TableTdRefactored) =>
          filteredHeader.map((item: TableThRefactored) => {
            return {
              col: item.col,
              row: el.row,
              data: el[item.keyField as keyof TableTdRefactored],
              keyField: item.keyField,
            };
          })
        );
        state.selectedRectData = {
          data: finalData,
          flatData: finalData.flat(),
        };
        return;
      }

      // state.selectedRectData = list;
    },
    changeColPosHandler: (state, action) => {
      const firstList = state.refactorheader.slice(0, action.payload.start);
      const betweenList = state.refactorheader.slice(
        action.payload.start + 1,
        action.payload.end + 1
      );
      const selectedColPosition = state.refactorheader[action.payload.start];
      const endList = state.refactorheader.slice(
        action.payload.end + 1,
        state.refactorheader.length
      );
      // state.refactorheader = [...firstList, selectedColPosition, ...endList];
      state.refactorheader = [
        ...firstList,
        ...betweenList,
        selectedColPosition,
        ...endList,
      ].map((el, index) => {
        return {
          ...el,
          col: index,
        };
      });
    },
    changeReverseColPosHandler: (state, action) => {
      const firstList = state.refactorheader.slice(0, action.payload.end);
      const betweenList = state.refactorheader.slice(
        action.payload.end,
        action.payload.start
      );
      const selectedColPosition = state.refactorheader[action.payload.start];
      const endList = state.refactorheader.slice(
        action.payload.start + 1,
        state.refactorheader.length
      );
      state.refactorheader = [
        ...firstList,
        selectedColPosition,
        ...betweenList,
        ...endList,
      ].map((el: TableThRefactored, index: number) => {
        return {
          ...el,

          col: index,
        };
      });
    },
    setEditModeCell: (state) => {
      state.cellInEditMode = state.activeCell;
    },
    deActiveCellEditMode: (state) => {
      state.cellInEditMode = null;
    },
    changeSheetData: (state, action) => {
      state.updatedData = [action.payload.data];
    },
    updateSheetData: (state, action) => {
      if (state.updatedData.length > 0) {
        const updatedObject = state.updatedData[0];
        state.refactorData = [
          ...state.refactorData.map((el: TableTdRefactored) => {
            if (el.row === updatedObject.row) {
              return {
                ...el,
                [updatedObject.keyField]: updatedObject.data,
              };
            } else {
              return el;
            }
          }),
        ];
        state.afterUpdateData = state.updatedData;
        state.updatedData = [];
      }
    },
    deleteCellHandler: (state) => {
      const updatedObject = state.activeCell;
      if (state.selectedRectData) {
        state.refactorData = [
          ...state.refactorData.map((el: TableTdRefactored) => {
            if (el.row === updatedObject.el.row) {
              return {
                ...el,
                [updatedObject.item.keyField]: "",
              };
            } else {
              return el;
            }
          }),
        ];
        state.afterUpdateData = state.updatedData;
        // state.activeCell = {
        //   item: state.activeCell.item,
        //   el: { ...state.activeCell.el, row: state.activeCell + 1 },
        // };
      }
    },
  },
});

export const {
  refactorHeaderHandler,
  refactorDataHandler,
  activeMouseDown,
  deActiveMouseDown,
  showDisplayRect,
  hideDisplayRect,
  selectRectDataHandler,
  selectRectInitialHandler,
  activeCellSelectHandler,
  removeActiveCell,
  enterKeyHandler,
  changeActiveCEllByArrow,
  createRect,
  calcSelectedRectData,
  changeColPosHandler,
  changeReverseColPosHandler,
  setEditModeCell,
  deActiveCellEditMode,
  changeSheetData,
  updateSheetData,
  deleteCellHandler,
} = sheetSlice.actions;
export default sheetSlice.reducer;
