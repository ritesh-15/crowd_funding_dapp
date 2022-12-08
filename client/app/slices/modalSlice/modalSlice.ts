import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModalSlice {
  open: boolean;
}

const initialState: IModalSlice = {
  open: false,
};

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = modalSlice.actions;

export default modalSlice.reducer;
