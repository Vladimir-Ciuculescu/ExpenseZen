import { User } from "../../interfaces/User";
import { supabase } from "../supabase";
import { compareHashed } from "../../utils/compareHashed";
import { hashPassword } from "../../utils/hashPassword";
import { Provider } from "../../interfaces/Provider";
import { Budget } from "../../interfaces/Budget";
import { MONTHLY_BUDGETS, USERS } from "../../constants/Tables";
import { CONVERT_BUDGETS_CURRENCY, GET_USER_BUDGETS } from "../../constants/PostgresFunctions";

const registerUser = async (user: User) => {
  const { firstName, lastName, email, password, provider } = user;

  try {
    const { data } = await supabase
      .from(USERS)
      .select("*")
      .filter("email", "eq", email)
      .filter("provider", "eq", provider)
      .single();

    if (data) {
      return {
        title: "Try again",
        message: "This user is already registered !",
      };
    } else {
      const { error } = await supabase.from(USERS).insert(
        [
          {
            first_name: firstName,
            last_name: lastName,
            email,
            password: await hashPassword(password),
            provider,
          },
        ],
        {
          returning: "minimal",
        }
      );
      if (error) {
        throw error;
      }

      return {
        title: "Success",
        message: "User succesfully created !",
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

const loginUser = async (email: string, password: string, provider: Provider) => {
  try {
    const { data } = await supabase
      .from(USERS)
      .select("*")
      .filter("email", "eq", email)
      .filter("provider", "eq", provider)
      .single();

    console.log(data);

    if (data && (await compareHashed(password, data.password))) {
      return {
        message: "User exists",
        data: data,
      };
    } else {
      return {
        message: "This user does not exist !",
      };
    }
  } catch (error) {
    return {
      message: error,
    };
  }
};

const getUserBudgets = async (userId: number) => {
  try {
    const { data } = await supabase.rpc(GET_USER_BUDGETS, {
      user_id: userId,
    });

    if (data) {
      return data;
    }
    return 0;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

const saveUserBudgets = async (userId: number, budgets: Budget[]) => {
  try {
    for (const item of budgets) {
      const { data } = await supabase
        .from(MONTHLY_BUDGETS)
        .select("*")
        .filter("category_id", "eq", item.id)
        .filter("user_id", "eq", userId)
        .single();

      if (data) {
        await supabase
          .from(MONTHLY_BUDGETS)
          .update({ budget: item.budget })
          .filter("category_id", "eq", item.id)
          .filter("user_id", "eq", userId);
      } else {
        await supabase.from(MONTHLY_BUDGETS).insert({
          user_id: userId,
          category_id: item.id,
          budget: item.budget,
        });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

const convertUserBudgetsCurrency = async (userId: number, conversionRate: number) => {
  try {
    const { error } = await supabase.rpc(CONVERT_BUDGETS_CURRENCY, {
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

export const UserService = {
  registerUser,
  loginUser,
  getUserBudgets,
  saveUserBudgets,
  convertUserBudgetsCurrency,
};
