import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const currentMonth = moment().format("MMMM");

interface initalStateProps {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  currency: string | null;
  symbol: string | null;
  theme: "light" | "dark";
  month: string;
}

const initialState: initalStateProps = {
  id: 0,
  firstName: null,
  lastName: null,
  email: null,
  currency: null,
  symbol: null,
  theme: "light",
  month: currentMonth,
};

const userReducer = createSlice({
  name: "user",

  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.id = payload.id;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
    },
    removeUser: (state) => {
      state.id = 0;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
    },
    setCurrency: (state, action) => {
      const { payload } = action;
      state.currency = payload.name;
      state.symbol = payload.symbol;
    },
    removeCurrency: (state) => {
      state.currency = null;
      state.symbol = null;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
  },
});

export const setUser = userReducer.actions.setUser;
export const removeUser = userReducer.actions.removeUser;
export const setCurrency = userReducer.actions.setCurrency;
export const removeCurrency = userReducer.actions.removeCurrency;
export const setThemeAction = userReducer.actions.setTheme;
export const setMonthAction = userReducer.actions.setMonth;

export default userReducer.reducer;
