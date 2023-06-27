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

export const CategoryService = {
  getAllCategories,
};
