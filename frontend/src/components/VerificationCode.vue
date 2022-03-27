<template>
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
            @keydown="(event) => onCodePress(event, index)"
          />
        </el-col>
      </template>
    </el-row>
  </el-form-item>
</template>

<script lang="ts" setup({ length }: VerificationCodeProps)>
import { reactive, ref, watch } from "vue";
import * as yup from "yup";

interface VerificationCodeProps {
  length: number;
}

enum KEY_CODE {
  BACKSPACE = "Backspace",
  LEFT = "ArrowLeft",
  UP = "ArrowUp",
  RIGHT = "ArrowRight",
  DOWN = "ArrowDown",
}

const inputRefs = reactive<{ element: HTMLInputElement; value: string }[]>(
  Array.from({ length }).map(() => ({
    element: null,
    value: "",
  }))
);
const exposeCode = ref<string>("");

watch(inputRefs, (refs, prevRefs) => {
  const code = refs.map((el) => el.value).join("");
  exposeCode.value = code;
});

const onCodeChange = (value: string, index: number) => {
  const currentInput = inputRefs[index];
  const nextInput = inputRefs[index + 1];

  if (!value.trim().length) return;
  if (!parseInt(value)) return (currentInput.value = "");
  if (value.length > 1) {
    const splittedValue = value.split("");
    const nextValue = splittedValue.shift();
    const fullValue = splittedValue.join("");
    currentInput.value = nextValue;
    return nextInput && onCodeChange(fullValue, index + 1);
  }

  currentInput.value = value;

  if (nextInput) {
    nextInput.element.focus();
    nextInput.element.select();
  }
};

const onCodePress = (event: KeyboardEvent, index: number) => {
  const currentInput = inputRefs[index];
  const nextInput = inputRefs[index + 1];
  const prevInput = inputRefs[index - 1];

  switch (event.code) {
    case KEY_CODE.BACKSPACE:
      event.preventDefault();
      currentInput.value = "";
      if (prevInput) {
        prevInput.element.focus();
        prevInput.element.select();
      }
      break;

    case KEY_CODE.LEFT:
      event.preventDefault();
      if (prevInput) {
        prevInput.element.focus();
        prevInput.element.select();
      }
      break;

    case KEY_CODE.RIGHT:
      event.preventDefault();
      if (nextInput) {
        nextInput.element.focus();
        nextInput.element.select();
      }
      break;

    case KEY_CODE.UP:
      event.preventDefault();
      break;

    case KEY_CODE.DOWN:
      event.preventDefault();
      break;

    default:
      break;
  }
};

defineExpose({
  exposeCode,
});
</script>

<style lang="scss" scoped></style>
