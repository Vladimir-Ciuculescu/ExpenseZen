import { FREECURRENCY_API_KEY } from "@env";
import { USERS, USERS_CURRENCIES } from "../../constants/Tables";
import { supabase } from "../supabase";
import axios from "axios";

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

const updateUserCurrency = async (userId: number, currencySymbol: string, currencyCode: string) => {
  try {
    const { error } = await supabase
      .from(USERS)
      .update({ currency_code: currencyCode, currency_symbol: currencySymbol })
      .filter("id", "eq", userId);

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
  console.log(FREECURRENCY_API_KEY);
  const { data } = await axios.get("https://api.freecurrencyapi.com/v1/currencies", {
    params: { apikey: FREECURRENCY_API_KEY },
  });
  console.log(data);
  return data.data;
};

export const CurrencyService = {
  getUserCurrency,
  updateUserCurrency,
  getAllCurrencies,
};
