import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType, UsersInitialStateDataType } from "../../types/usersType";
import { userLogin } from "./usersAsyncThunks";

const initialState: UsersInitialStateDataType = {
  entity: {} as UserDataType,
  status: "idle",
  error: null
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logOut() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    //userLogin
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<UserDataType>) => {
        state.status = "succeeded"
        state.entity = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default usersSlice.reducer;
export const { logOut } = usersSlice.actions;
