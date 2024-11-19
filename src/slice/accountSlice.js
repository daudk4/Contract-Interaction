import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
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
    addAccount: (state, action) => {
      state.accounts.push({ ...action.payload });
    },
  },
});
export const selectMnemonics = (state) => state.accountReducer.mnemonics;
export const selectAccounts = (state) => state.accountReducer.accounts;

export const { setAccountDetails, addAccount } = accountSlice.actions;
export default accountSlice.reducer;
