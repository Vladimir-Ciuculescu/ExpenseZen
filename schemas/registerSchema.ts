import * as Yup from "yup";

export const registerSchema = Yup.object({
  firstName: Yup.string().required("Please add your first name "),
  lastName: Yup.string().required("Please add your second name "),
  email: Yup.string()
    .email(`That's not a proper email address !`)
    .required("Email required "),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be of 6 characters"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Retype your password "),
});
