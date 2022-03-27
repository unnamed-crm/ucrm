import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup
    .string()
    .required("This field is required")
    .email("Email is not valid"),
  password: yup.string().required("This field is required"),
  confirmPassword: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  verificationCode: yup
    .string()
    .notRequired()
    .length(5, "Verification Code are not full"),
});

export type RegisterSchema = typeof registerSchema;
export type RegisterData = yup.InferType<typeof registerSchema>;
