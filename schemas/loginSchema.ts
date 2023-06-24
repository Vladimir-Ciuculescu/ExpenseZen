import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("That's not a valid email address !")
    .required("Please add you email address"),
  password: Yup.string()
    .required("Please fill in your password !")
    .min(6, "Password must have at least 6 characters"),
});
