import * as yup from "yup";

export const authSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export const registerSchema = authSchema.shape({
  username: yup.string().min(2).required("Username required"),
  country: yup.string().min(2).required("Country required"),
});
