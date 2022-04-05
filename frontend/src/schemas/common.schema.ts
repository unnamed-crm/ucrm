import * as yup from "yup";

export const verificationCodeSchema = yup.object({
  verificationCode: yup
    .number()
    .default(0)
    .required("This field is required")
    .test(
      "length",
      "Verification Code are not full",
      (value) => value && value.toString().length === 5,
    ),
});

export type VerificationCodeSchema = typeof verificationCodeSchema;
export type VerificationCodeData = yup.InferType<VerificationCodeSchema>;
