import * as Yup from "yup";

export const expenseSchema = Yup.object({
  amount: Yup.string().required("Please fill in the amount !"),
  category: Yup.string().required("Please select a category !"),
  description: Yup.string().required("Please fill in the description !"),
});
