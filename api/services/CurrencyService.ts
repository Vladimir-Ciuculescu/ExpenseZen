import { CURRENCIES, USERS_CURRENCIES } from "../../constants/Tables";
import { supabase } from "../supabase";

const getUserCurrency = async (userId: number) => {
  try {
    const { data } = await supabase
      .from(USERS_CURRENCIES)
      .select("*, currencies(name, symbol)")
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
      .from(USERS_CURRENCIES)
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
    const { data } = await supabase.from(CURRENCIES).select("*");

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
