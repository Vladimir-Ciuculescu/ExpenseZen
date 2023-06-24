import * as Yup from "yup";

export const registerSchema = Yup.object({
  firstName: Yup.string().required("Please add your first name !"),
  lastName: Yup.string().required("Please add your second name !"),
  email: Yup.string()
    .email(`That's not a valid email address !`)
    .required("Please add your email address !"),
  password: Yup.string()
    .required("Please provide a password")
    .min(6, "Password must have at least 6 characters"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Retype your password "),
});
