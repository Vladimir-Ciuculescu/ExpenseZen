import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
  },
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
    },
    removeUser: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
    },
  },
});

export const setUser = userReducer.actions.setUser;
export const removeUser = userReducer.actions.removeUser;

export default userReducer.reducer;
