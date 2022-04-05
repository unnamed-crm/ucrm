import { reactive } from "vue";
import * as yup from "yup";

type Errors = { [key: string]: string };

type UseValidateReturnType = {
  errors: Errors;
  validate: () => Promise<boolean>;
};

export const useValidate = <T extends yup.AnySchema>(
  schema: T,
  data: yup.InferType<T>,
): UseValidateReturnType => {
  const errors = reactive<Errors>(
    Object.fromEntries(Object.entries(data).map(([key, _]) => [key, ""])),
  );

  const resetErrors = () => Object.keys(errors).map((key) => (errors[key] = ""));

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

    await schema.validate(data, { abortEarly: false }).catch(handleValidationErrors);

    return checkIsFormValid();
  };

  return { errors, validate };
};
