import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup.string().required("This field is required").email("Email is not valid"),
  password: yup
    .string()
    .transform((value) => value || undefined)
    .required("This field is required")
    .min(5, "Password is too short"),
  confirmPassword: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export type RegisterSchema = typeof registerSchema;
export type RegisterData = yup.InferType<typeof registerSchema>;
