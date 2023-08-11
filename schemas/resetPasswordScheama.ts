import * as Yup from "yup";

export const resetPasswordSchema = Yup.object({
  email: Yup.string()
    .email(`That's not a valid email address`)
    .required("Please add your email address !"),
  password: Yup.string()
    .required("Please provide a password")
    .min(6, "Password must have at least 6 characters"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null as any], "Passwords don't match!")
    .required("Retype your password "),
});
