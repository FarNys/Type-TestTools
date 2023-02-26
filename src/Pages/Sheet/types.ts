export interface TableTd {
  name: string;
  lastname: string;
  email: string;
  number: number;
  content: string;
}
export interface TableTdExtra {
  row: number;
}

export type TableTdRefactored = TableTdExtra & TableTd;
export interface TableTh {
  title: string;
  keyField: string;
}

export interface TableThExtra {
  width: string;
  col: number;
}

export type TableThRefactored = TableThExtra & TableTh;

export interface SelectedCell {
  header: TableTh & TableThExtra;
  data: TableTd & TableTdExtra;
}

interface SingleRectDataType {
  col: number;
  row: number;
  keyField: number;
  data: string | number;
}
export interface RectDataType {
  data: SingleRectDataType[][];
  flatData: SingleRectDataType[];
}
