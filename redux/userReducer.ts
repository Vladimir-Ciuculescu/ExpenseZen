import { createSlice } from "@reduxjs/toolkit";

interface initalStateProps {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

const initialState: initalStateProps = {
  firstName: null,
  lastName: null,
  email: null,
};

const userReducer = createSlice({
  name: "user",

  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
    },
    removeUser: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.email = null;
    },
  },
});

export const setUser = userReducer.actions.setUser;
export const removeUser = userReducer.actions.removeUser;

export default userReducer.reducer;
