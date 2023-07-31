import { createSlice } from "@reduxjs/toolkit";
import { Expense } from "../interfaces/Expense";

interface initialStateProps {
  expenses: Expense[];
  todayTotal: number;
}

const initialState: initialStateProps = {
  expenses: [],
  todayTotal: 0,
};

const expensesReducer = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    setTodayTotal: (state, action) => {
      const { expenses, todayDate } = action.payload;
      state.todayTotal = expenses
        .filter((expense: Expense) => expense.paydate === todayDate)
        .reduce(
          (accumulator: any, currentValue: Expense) =>
            accumulator + currentValue.amount,
          0
        );
    },
  },
});

export const setExpensesAction = expensesReducer.actions.setExpenses;
export const setTodayTotalAction = expensesReducer.actions.setTodayTotal;
export default expensesReducer.reducer;
