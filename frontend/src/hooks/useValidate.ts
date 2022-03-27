import { reactive } from "vue";
import * as yup from "yup";

interface UseValidateProps<T> {
  schema: yup.AnySchema;
  data: yup.InferType<yup.AnySchema>;
}

export const useValidate = <T extends yup.AnySchema>(
  schema: T,
  data: yup.InferType<T>
) => {
  const errors = reactive<typeof data>({ ...data });

  const resetErrors = () =>
    Object.keys(errors).map((key) => (errors[key] = ""));

  const checkIsFormValid = () => Object.values(errors).every((el) => !el);

  const handleValidationErrors = (error: yup.ValidationError) => {
    if (error.inner.length) {
      error.inner.map((el) => (errors[el.path] = el.message));
      return;
    }
    errors[error.path] = error.message;
  };

  const validate = async () => {
    resetErrors();

    await schema
      .validate(data, { abortEarly: false })
      .catch(handleValidationErrors);

    return checkIsFormValid();
  };

  return { errors, validate };
};
