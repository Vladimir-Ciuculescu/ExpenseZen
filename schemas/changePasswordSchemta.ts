import * as Yup from "yup";

export const changePasswordSchema = Yup.object({
  password: Yup.string()
    .required("Please provide a password")
    .min(6, "Password must have at least 6 characters"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null as any], "Passwords don't match!")
    .required("Retype your password "),
});
