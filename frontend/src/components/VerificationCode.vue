<template>
  <!-- eslint-disable vue/no-v-for-template-key -->
  <el-form-item label="Verification Code" :error="errors.verificationCode">
    <el-row justify="space-between" :gutter="5">
      <template v-for="(input, index) in inputRefs" :key="index">
        <el-col :span="4">
          <el-input
            type="text"
            minlength="1"
            :maxlength="props.length"
            :ref="(el: HTMLInputElement) => el && (input.element = el)"
            v-model.trim="input.value"
            @input="(value) => onCodeChange(value, index)"
            @keydown="(event) => onCodePress(event, index)"
          />
        </el-col>
      </template>
    </el-row>
  </el-form-item>
</template>

<script lang="ts" setup>
import { reactive, watch, defineProps, withDefaults, defineExpose } from "vue";
import { useValidate } from "../hooks/useValidate";
import {
  verificationCodeSchema,
  VerificationCodeSchema,
  VerificationCodeData,
} from "../schemas/common.schema";

interface VerificationCodeProps {
  length?: number;
}

const props = withDefaults(defineProps<VerificationCodeProps>(), {
  length: 5,
});

enum KEY_CODE {
  BACKSPACE = "Backspace",
  LEFT = "ArrowLeft",
  UP = "ArrowUp",
  RIGHT = "ArrowRight",
  DOWN = "ArrowDown",
}

const verificationCodeData = reactive<VerificationCodeData>({
  verificationCode: null,
});
const { errors, validate } = useValidate<VerificationCodeSchema>(
  verificationCodeSchema,
  verificationCodeData
);

const inputRefs = reactive<{ element: HTMLInputElement; value: string }[]>(
  Array.from({ length: props.length }).map(() => ({
    element: null,
    value: "",
  }))
);

watch(inputRefs, (inputs) => {
  const code = parseInt(inputs.map((el) => el.value).join(""), 10) || 0;
  verificationCodeData.verificationCode = code;
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
  validate,
  getVerificationCode: () => verificationCodeData,
});
</script>

<style lang="scss" scoped></style>
