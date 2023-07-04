import { Expense } from "../../interfaces/Expense";
import { getCurrentDate } from "../../utils/getCurrentDate";
import { supabase } from "../supabase";

const AddExpense = async (expense: Expense) => {
  const { amount, categoryId, description, userId } = expense;

  const currentDate = getCurrentDate();

  await supabase
    .from("expenses")
    .insert({
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
  const currentDate = getCurrentDate();

  try {
    const { data } = await supabase
      .from("expenses")
      .select("amount")
      .filter("user_id", "eq", userId)
      .filter("date", "eq", currentDate);

    const todayTotal = data?.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    return todayTotal;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

export const ExpenseService = {
  AddExpense,
  getTodayTotalExpenses,
};
