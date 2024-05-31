import { configureStore } from "@reduxjs/toolkit";
import Input from "./Input/Input";
export const store = configureStore({
  reducer: {
    memeText: Input,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
