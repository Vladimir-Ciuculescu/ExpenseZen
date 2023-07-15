import moment from "moment";
import { supabase } from "../supabase";
import { CATEGORIES } from "../../constants/Tables";
import { GET_TOP_SPENDINGS } from "../../constants/PostgresFunctions";

const getAllCategories = async () => {
  try {
    const { data } = await supabase.from(CATEGORIES).select("*");

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

  try {
    const { data } = await supabase.rpc(GET_TOP_SPENDINGS, {
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
