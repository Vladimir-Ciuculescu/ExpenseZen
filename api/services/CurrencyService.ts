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

const addUserCurrency = async (userId: number, currencyId: number) => {
  try {
    const { error } = await supabase
      .from("users_currencies")
      .insert([{ user_id: userId, currency_id: currencyId }]);
    if (error) {
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

const getAllCurrencies = async () => {
  try {
    const { data } = await supabase.from("currencies").select("*");

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
  addUserCurrency,
};
