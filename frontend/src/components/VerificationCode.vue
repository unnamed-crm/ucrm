<template>
  <!-- eslint-disable vue/no-v-for-template-key -->
  <el-form-item label="Verification Code" :error="props.error">
    <el-row justify="space-between" :gutter="5">
      <template
        v-for="(input, index) in Array.from({ length: props.length })"
        :key="index"
      >
        <el-col :span="4">
          <el-input
            type="text"
            minlength="1"
            :maxlength="props.length"
            :ref="(el) => el && (input.element = el)"
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
import { reactive, ref, watch, defineProps, withDefaults } from "vue";

interface VerificationCodeProps {
  length: number;
  error: string;
}

const props = withDefaults(defineProps<VerificationCodeProps>(), {
  length: 5,
  error: "",
});

enum KEY_CODE {
  BACKSPACE = "Backspace",
  LEFT = "ArrowLeft",
  UP = "ArrowUp",
  RIGHT = "ArrowRight",
  DOWN = "ArrowDown",
}

const inputRefs = reactive<{ element: HTMLInputElement; value: string }[]>(
  Array.from({ length: props.length }).map(() => ({
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
</script>

<style lang="scss" scoped></style>
