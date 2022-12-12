import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isLabeledStatement } from "typescript";

interface IUserState {
  walletAddress?: string;
  isLoggedIn: boolean;
  eth: any;
}

const initialState: IUserState = {
  walletAddress: undefined,
  isLoggedIn: false,
  eth: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
      state.isLoggedIn = true;
    },
    setEth: (state, action: PayloadAction<any>) => {
      state.eth = action.payload;
    },
  },
});

export const { setWalletAddress, setEth } = userSlice.actions;

export default userSlice.reducer;
