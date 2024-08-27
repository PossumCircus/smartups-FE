import { createSlice } from "@reduxjs/toolkit";
import { themeInitialStateType } from "../../types/commonType";

const initialState: themeInitialStateType = {
  themeMode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode(state, action) {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
