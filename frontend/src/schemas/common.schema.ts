import * as yup from "yup";
import { VERIFICATION_CODE_LENGTH } from "../constants";

export const verificationCodeSchema = yup.object({
  code: yup
    .number()
    .default(0)
    .required("This field is required")
    .test(
      "length",
      "Verification Code are not full",
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().length === VERIFICATION_CODE_LENGTH,
    ),
});

export type VerificationCodeSchema = typeof verificationCodeSchema;
export type VerificationCodeData = yup.InferType<VerificationCodeSchema>;
