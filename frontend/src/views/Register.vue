<template>
  <el-form
    class="form"
    @submit.prevent="register(formRef)"
    label-position="top"
    hide-required-asterisk
    novalidate
  >
    <h1 class="title">Register</h1>

    <template v-if="!receivedVerificationCode.length">
      <el-form-item label="Email" prop="email" :error="errors.email">
        <el-input
          v-model.trim="formData.email"
          error="errors.email"
          type="text"
          placeholder="email@domain.com"
        />
      </el-form-item>
      <el-form-item label="Password" :error="errors.password">
        <el-input
          v-model.trim="formData.password"
          type="password"
          show-password
          placeholder="password..."
        />
      </el-form-item>
      <el-form-item label="Confirm Password" :error="errors.confirmPassword">
        <el-input
          v-model.trim="formData.confirmPassword"
          type="password"
          show-password
          placeholder="password..."
        />
      </el-form-item>
      <el-button
        class="button"
        native-type="button"
        @click="sendVerifyCode"
        type="primary"
      >
        Send Verify Code
      </el-button>
    </template>

    <template v-else>
      <el-form-item label="Verification Code" :error="errors.verificationCode">
        <el-row justify="space-between" :gutter="5">
          <!-- eslint-disable-next-line vue/no-v-for-template-key -->
          <template v-for="(_, index) in receivedVerificationCode" :key="index">
            <el-col :span="4">
              <el-input
                type="text"
                minlength="1"
                :maxlength="receivedVerificationCode.length"
                :ref="(el) => el && (inputRefs[index].element = el)"
                v-model.trim="inputRefs[index].value"
                @input="(value) => onCodeChange(value, index)"
                @keydown="(e) => onCodePress(e, index)"
              />
            </el-col>
          </template>
        </el-row>
      </el-form-item>
      <el-button class="button" native-type="submit" type="primary">
        Submit
      </el-button>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as yup from "yup";

const store = useStore();
const router = useRouter();

const formSchema = yup.object({
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
type FormSchema = yup.InferType<typeof formSchema>;

const formData = reactive<FormSchema>({
  email: "",
  password: "",
  confirmPassword: "",
  verificationCode: "",
});
const errors = reactive({ ...formData });

const receivedVerificationCode = reactive([]);

enum KEY_CODE {
  BACKSPACE = "Backspace",
  LEFT = "ArrowLeft",
  UP = "ArrowUp",
  RIGHT = "ArrowRight",
  Down = "ArrowDown",
}

const inputRefs = reactive<{ element: HTMLInputElement; value: string }[]>(
  Array.from({ length: receivedVerificationCode.length }).map(() => ({
    element: null,
    value: "",
  }))
);

watch(inputRefs, (refs, prevRefs) => {
  const code = refs.map((el) => el.value).join("");
  formData.verificationCode = code;
});

const onCodeChange = (value: string, index: number) => {
  const currentInput = inputRefs[index];
  const nextInput = inputRefs[index + 1];

  if (value === "") return;
  if (value === " ") return;
  if (!parseInt(value)) return (currentInput.value = "");
  if (value.length > 1) {
    const splittedValue = value.split("");
    const nextValue = splittedValue.shift();
    const fullValue = splittedValue.join("");
    currentInput.value = nextValue;
    return nextInput && onCodeChange(fullValue, index + 1);
  }
  currentInput.value = value;
  if (nextInput) return nextInput.element.focus();
};

const onCodePress = (e: KeyboardEvent, index: number) => {
  const currentInput = inputRefs[index];
  const nextInput = inputRefs[index + 1];
  const prevInput = inputRefs[index - 1];

  switch (e.code) {
    case KEY_CODE.BACKSPACE:
      currentInput.value = "";
      prevInput && prevInput.element.focus();
      break;

    case KEY_CODE.LEFT:
      prevInput && prevInput.element.focus();
      break;

    case KEY_CODE.RIGHT:
      nextInput && nextInput.element.focus();
      break;

    default:
      break;
  }
};

const handleValidationErrors = (e: yup.ValidationError) => {
  if (!e.inner.length) {
    if (!receivedVerificationCode.length && e.path === "verificationCode")
      return;
    errors[e.path] = e.message;
    return;
  }
  e.inner.forEach((el) => handleValidationErrors(el));
};

const resetErrors = () => Object.keys(errors).map((key) => (errors[key] = ""));

const checkIsFormValid = () => Object.values(errors).every((el) => !el);

const sendVerifyCode = async () => {
  resetErrors();

  await formSchema
    .validate(formData, { abortEarly: false })
    .catch(handleValidationErrors);

  const isValid = checkIsFormValid();
  if (!isValid) return;

  // get verification code
  // receivedVerificationCode = code.split('');
};

const register = async () => {
  resetErrors();

  await formSchema
    .validateAt("verificationCode", formData.verificationCode)
    .catch(handleValidationErrors);

  const isValid = checkIsFormValid();
  if (!isValid) return;

  store
    .dispatch("register", formData)
    .then(() => router.push("/"))
    .catch((err) => console.log(err));
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
  padding: 2rem;
  background-color: $background;
  border-radius: $border-radius;
}

.button {
  margin-top: 0.5rem;
}
</style>
