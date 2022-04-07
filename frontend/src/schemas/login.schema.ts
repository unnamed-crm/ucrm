import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("This field is required").email("Email is not valid"),
  password: yup
    .string()
    .transform((value) => value || undefined)
    .required("This field is required")
    .min(5, "Password is too short"),
});

export type LoginSchema = typeof loginSchema;
export type LoginData = yup.InferType<typeof loginSchema>;
