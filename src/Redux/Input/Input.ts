import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  topText: string;
  bottomText: string;
}

const initialState: InitialState = {
  topText: "",
  bottomText: "",
};

const inputSlice = createSlice({
  name: "input",
  initialState: initialState,
  reducers: {
    setInputs: (state, action: PayloadAction<InitialState>) => {
      console.log("action.payload");

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
