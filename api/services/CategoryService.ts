import moment from "moment";
import { supabase } from "../supabase";

const getAllCategories = async () => {
  try {
    const { data } = await supabase.from("categories").select("*");

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

const getTopSpendingCategories = async (userId: number) => {
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");

  console.log(startOfMonth);

  try {
    const { data } = await supabase.rpc("get_top_spendings", {
      user_id: userId,
      start_month: startOfMonth,
      end_month: endOfMonth,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

export const CategoryService = {
  getAllCategories,
  getTopSpendingCategories,
};
