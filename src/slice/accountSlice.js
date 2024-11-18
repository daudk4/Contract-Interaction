import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mnemonics: null,
  password: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountDetails: (state, action) => {
      state.mnemonics = action.payload.mnemonics;
      state.password = action.payload.password;
    },
  },
});
export const selectMnemonics = (state) => state.mnemonics;
export const { setAccountDetails } = accountSlice.actions;
export default accountSlice.reducer;
