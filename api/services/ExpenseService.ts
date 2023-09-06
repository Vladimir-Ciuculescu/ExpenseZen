import { CONVERT_EXPENSES_CURRENCY, GET_MONTH_EXPENSES } from "../../constants/PostgresFunctions";
import { EXPENSES } from "../../constants/Tables";
import { Expense } from "../../interfaces/Expense";
import { getCurrentDate } from "../../utils/getCurrentDate";
import { supabase } from "../supabase";

// const startMonth = moment().startOf("month").format("YYYY-MM-DD");
// const endMonth = moment().endOf("month").format("YYYY-MM-DD");

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

const getMonthExpenses = async (userId: number, startOfMonth: string, endOfMonth: string) => {
  try {
    const { data } = await supabase.rpc(GET_MONTH_EXPENSES, {
      start_month: startOfMonth,
      end_month: endOfMonth,
      user_id: userId,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

const convertExpensesCurrency = async (userId: number, conversionRate: number) => {
  try {
    const { error } = await supabase.rpc(CONVERT_EXPENSES_CURRENCY, {
      user_id: userId,
      conversion_rate: conversionRate,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

const removeUserExpenses = async (userId: number) => {
  try {
    const { error } = await supabase.from(EXPENSES).delete().filter("user_id", "eq", userId);

    if (error) {
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

export const ExpenseService = {
  AddExpense,
  getMonthExpenses,
  convertExpensesCurrency,
  removeUserExpenses,
};
