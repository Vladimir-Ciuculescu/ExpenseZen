import {
  CONVERT_EXPENSES_CURRENCY,
  GET_MONTHLY_CATEGORY_EXPENSES,
  GET_MONTH_EXPENSES,
  GET_MONTH_TOTAL,
  GET_TODAY_TOTAL,
} from "../../constants/PostgresFunctions";
import { EXPENSES } from "../../constants/Tables";
import { Expense } from "../../interfaces/Expense";
import { getCurrentDate } from "../../utils/getCurrentDate";
import { supabase } from "../supabase";
import moment from "moment";

const startMonth = moment().startOf("month").format("YYYY-MM-DD");
const endMonth = moment().endOf("month").format("YYYY-MM-DD");

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

const getMonthExpenses = async (userId: number) => {
  try {
    const { data } = await supabase.rpc(GET_MONTH_EXPENSES, {
      start_month: startMonth,
      end_month: endMonth,
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

// const getMonthlyCategoryExpenses = async (userId: number, categoryId: number) => {
//   try {
//     const { data } = await supabase.rpc(GET_MONTHLY_CATEGORY_EXPENSES, {
//       start_month: startMonth,
//       end_month: endMonth,
//       user_id: userId,
//       category_id: categoryId,
//     });

//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error);
//     }
//   }
// };

export const ExpenseService = {
  AddExpense,
  getMonthExpenses,
  convertExpensesCurrency,
  //getMonthlyCategoryExpenses,
};
