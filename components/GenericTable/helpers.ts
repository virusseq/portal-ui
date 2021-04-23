import { Row } from 'react-table';

export type SortingFunctionType = (rowA: Row, rowB: Row, columnId: string) => number;

export const uuidSort: SortingFunctionType = (rowA, rowB, columnId) =>
  rowA.values[columnId].replace('-', '') > rowB.values[columnId].replace('-', '') ? 1 : -1;

export const numberSort: SortingFunctionType = (rowA, rowB, columnId) =>
  rowB.values[columnId] - rowA.values[columnId];
