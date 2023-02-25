import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//ALL TYPE DEFINITION
type SelectedCell = {
  header: any;
  data: any;
};
type SliceParameterTypes = {
  activeCell: any;
  isDisplayRect: Boolean;
  isMouseDown: Boolean;
  selectedList: SelectedCell[];
};

// TYPE END
const initialState: SliceParameterTypes = {
  activeCell: null,
  isDisplayRect: false,
  isMouseDown: false,
  selectedList: [],
};

const sheetSlice = createSlice({
  // A name, used in action types:
  name: "sheet",
  // The initial state:
  initialState,
  // An object of "case reducers".
  // Key names will be used to generate actions:
  reducers: {
    activeMouseDown: (state) => {
      state.isMouseDown = true;
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
    },
    createRect: (state, action) => {
      action.payload.ref.current.style.top = `${
        (action.payload.minRow + 1) * 40
      }px`;
      action.payload.ref.current.style.left = `${
        action.payload.minCol * 150 + 40 - 3
      }px`;
      action.payload.ref.current.style.width = `${
        (action.payload.maxCol - action.payload.minCol) * 150
      }px`;
      action.payload.ref.current.style.height = `${
        40 + (action.payload.maxRow - action.payload.minRow - 1) * 40
      }px`;
    },

    selectRectDataHandler: (state, action) => {
      state.selectedList = [action.payload.data];
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
    goNextRow: (state) => {
      const findRow = state.activeCell?.el.row;
      if (findRow || findRow === 0) {
        state.activeCell = {
          item: state.activeCell.item,
          el: { ...state.activeCell.el, row: findRow + 1 },
        };
      }
    },
    changeActiveCEllByArrow: (state, action) => {
      const findRow = state.activeCell?.el.row;
      const findCol = state.activeCell?.item.col;
      const findArrow = action.payload.code;
      if (findRow || findRow === 0) {
        if (findCol || findCol === 0) {
          //LEFT ARROW
          if (findArrow === 37) {
            state.activeCell = {
              item: { ...state.activeCell.item, col: findCol - 1 },
              el: { ...state.activeCell.el },
            };
            return;
          }
          //RIGHT ARROW
          if (findArrow === 39) {
            state.activeCell = {
              item: { ...state.activeCell.item, col: findCol + 1 },
              el: { ...state.activeCell.el },
            };
            return;
          }
          //UP ARROW
          if (findArrow === 38) {
            state.activeCell = {
              item: state.activeCell.item,
              el: { ...state.activeCell.el, row: findRow - 1 },
            };
            return;
          }
          //DOWN ARROW
          if (findArrow === 40) {
            state.activeCell = {
              item: state.activeCell.item,
              el: { ...state.activeCell.el, row: findRow + 1 },
            };
            return;
          }
        }
      }
    },
  },
});

export const {
  activeMouseDown,
  deActiveMouseDown,
  showDisplayRect,
  hideDisplayRect,
  selectRectDataHandler,
  selectRectInitialHandler,
  activeCellSelectHandler,
  removeActiveCell,
  goNextRow,
  changeActiveCEllByArrow,
  createRect,
} = sheetSlice.actions;
export default sheetSlice.reducer;
