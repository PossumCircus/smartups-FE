import { PaletteMode } from "@mui/material";

export type themeInitialStateType = {
  themeMode: PaletteMode
}

export interface PaginationOptionsDataType {
  pageCountPerGroup: number;
  currentPage: number;
  totalPage: number;
  itemCountPerPage: number;
}