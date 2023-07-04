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
    const { data } = await supabase.rpc("get_today_total", { user_id: userId });

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

const getMonthTotalExpensed = async (userId: number) => {
  const startMonth = moment().startOf("month").format("YYYY-MM-DD");
  const endMonth = moment().endOf("month").format("YYYY-MM-DD");

  try {
    const { data } = await supabase.rpc("get_month_total", {
      start_month: startMonth,
      endMonth,
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
  getMonthTotalExpensed,
};