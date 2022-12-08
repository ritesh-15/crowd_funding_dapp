import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isLabeledStatement } from "typescript";

interface IUserState {
  walletAddress?: string;
  isLoggedIn: boolean;
}

const initialState: IUserState = {
  walletAddress: undefined,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { setWalletAddress } = userSlice.actions;

export default userSlice.reducer;
