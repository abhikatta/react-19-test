import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MemeText } from "../../Components/GetMeme/types";

const initialState: MemeText = {
  topText: "",
  bottomText: "",
};

const inputSlice = createSlice({
  name: "input",
  initialState: initialState,
  reducers: {
    setInputs: (state, action: PayloadAction<MemeText>) => {
      state.topText = action.payload.topText;
      state.bottomText = action.payload.bottomText;
    },
    clearInputs: (state) => {
      state.topText = initialState.topText;
      state.bottomText = initialState.bottomText;
    },
  },
});

export const { setInputs, clearInputs } = inputSlice.actions;

export default inputSlice.reducer;
