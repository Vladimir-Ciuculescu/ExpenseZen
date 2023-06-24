import { User } from "../../interfaces/User";
import { supabase } from "../supabase";
import { Alert } from "react-native";
import { compareHashed } from "../../utils/compareHashed";
import { hashPassword } from "../../utils/hashPassword";

const registerUser = async (user: User) => {
  const { firstName, lastName, email, password, provider } = user;

  console.log(password);

  try {
    const { data } = await supabase
      .from("users")
      .select("*")
      .filter("email", "eq", email)
      //.filter("passowrd", "eq", password)
      .filter("provider", "eq", provider)
      .single();

    if (data && (await compareHashed(password, data.password))) {
      return {
        title: "Try again",
        message: "This user is already registered !",
      };
    } else {
      const { error } = await supabase.from("users").insert(
        [
          {
            first_name: firstName,
            last_name: lastName,
            email,
            //password,
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
      Alert.alert(error.message);
    }
  }
};

export const UserService = {
  registerUser,
};
