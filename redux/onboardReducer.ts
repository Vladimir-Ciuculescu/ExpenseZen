import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  onboarded: boolean;
}

const initialState: initialStateProps = {
  onboarded: false,
};

const onboardedReducer = createSlice({
  name: "onboard",
  initialState: initialState,
  reducers: {
    onBoard: (state) => {
      state.onboarded = true;
    },
  },
});

export const onBoard = onboardedReducer.actions.onBoard;

export default onboardedReducer.reducer;
