import {
  GET_MONTH_TOTAL,
  GET_TODAY_TOTAL,
} from "../../constants/PostgresFunctions";
import { Expense } from "../../interfaces/Expense";
import { getCurrentDate } from "../../utils/getCurrentDate";
import { supabase } from "../supabase";
import moment from "moment";

const AddExpense = async (expense: Expense) => {
  const { amount, categoryId, description, userId } = expense;

  const currentDate = getCurrentDate();

  await supabase.from("expenses").insert({
    user_id: userId,
    category_id: categoryId,
    amount,
    description,
    date: currentDate,
  });

  try {
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

const getTodayTotalExpenses = async (userId: number) => {
  try {
    const { data } = await supabase.rpc(GET_TODAY_TOTAL, { user_id: userId });

    if (data) {
      return data;
    }
    return 0;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

const getMonthTotalExpenses = async (userId: number) => {
  const startMonth = moment().startOf("month").format("YYYY-MM-DD");
  const endMonth = moment().endOf("month").format("YYYY-MM-DD");

  try {
    const { data } = await supabase.rpc(GET_MONTH_TOTAL, {
      start_month: startMonth,
      end_month: endMonth,
      user_id: userId,
    });

    if (data) {
      return data;
    }
    return 0;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

export const ExpenseService = {
  AddExpense,
  getTodayTotalExpenses,
  getMonthTotalExpenses,
};
