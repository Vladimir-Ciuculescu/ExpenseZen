import { FREECURRENCY_API_KEY } from "@env";
import { USERS } from "../../constants/Tables";
import { supabase } from "../supabase";
import axios from "axios";

const apiUrl = "https://api.freecurrencyapi.com/v1";

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
  const { data } = await axios.get(`${apiUrl}/currencies`, {
    params: { apikey: FREECURRENCY_API_KEY },
  });
  return data.data;
};

const getCurrencyConversionRate = async (baseCurrency: string, currencyToChange: string) => {
  try {
    const { data } = await axios.get(`${apiUrl}/latest`, {
      params: {
        apikey: FREECURRENCY_API_KEY,
        currencies: currencyToChange,
        base_currency: baseCurrency,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const CurrencyService = {
  updateUserCurrency,
  getAllCurrencies,
  getCurrencyConversionRate,
};
