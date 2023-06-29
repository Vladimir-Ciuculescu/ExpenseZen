import { supabase } from "../supabase";

const getUserCurrency = async (userId: number) => {
  try {
    const { data } = await supabase
      .from("users_currencies")
      .select("*")
      .eq("user_id", userId)
      .single();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

const getAllCurrencies = async () => {
  try {
    const { data } = await supabase.from("currencies").select("*");
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

export const CurrencyService = {
  getUserCurrency,
  getAllCurrencies,
};
