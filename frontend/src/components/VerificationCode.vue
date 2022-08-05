<template>
  <!-- eslint-disable vue/no-v-for-template-key -->
  <el-form-item class="verify-code" label="Verification Code" :error="errors.verificationCode">
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
    <el-row>
      <template v-if="!isTimerLeft">
        <el-col>
          <span class="resend-title">
            Code can be resent after {{ time.mins.value }}:{{ time.secs.value }}
          </span>
        </el-col>
      </template>
      <template v-else>
        <el-col>
          <el-link class="resendLink" type="primary" @click.prevent="onResendClick">
            Resend
          </el-link>
        </el-col>
      </template>
    </el-row>
  </el-form-item>
</template>

<script lang="ts" setup>
import {
  reactive,
  watch,
  defineProps,
  defineEmits,
  withDefaults,
  defineExpose,
  onMounted,
  onUnmounted,
} from "vue";
import { useValidate } from "../hooks/useValidate";
import { useTimer } from "../hooks/useTimer";
import {
  verificationCodeSchema,
  VerificationCodeSchema,
  VerificationCodeData,
} from "../schemas/common.schema";
import { VERIFICATION_CODE_LENGTH, VERIFICATION_CODE_RESEND_TIME } from "../constants";

interface VerificationCodeProps {
  length?: number;
}

type InputRef = {
  element: HTMLInputElement;
  value: string;
};

enum KEY_CODE {
  BACKSPACE = "Backspace",
  LEFT = "ArrowLeft",
  UP = "ArrowUp",
  RIGHT = "ArrowRight",
  DOWN = "ArrowDown",
}

const props = withDefaults(defineProps<VerificationCodeProps>(), {
  length: VERIFICATION_CODE_LENGTH,
});

const emit = defineEmits(["resend"]);

const verificationCodeData = reactive<VerificationCodeData>({
  code: null,
});
const { errors, validate } = useValidate<VerificationCodeSchema>(
  verificationCodeSchema,
  verificationCodeData,
);

const { createInterval, removeInterval, time, isTimerLeft } = useTimer(
  VERIFICATION_CODE_RESEND_TIME,
);

const inputRefs = reactive<InputRef[]>(
  Array.from({ length: props.length }).map(() => ({
    element: null,
    value: "",
  })),
);

onMounted(() => {
  createInterval();
});

onUnmounted(() => {
  removeInterval();
});

watch(inputRefs, (inputs) => {
  const code = parseInt(inputs.map((el) => el.value).join(""), 10) || 0;
  verificationCodeData.code = code;
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

const onResendClick = () => {
  if (!isTimerLeft.value) return;
  emit("resend");
  removeInterval();
  createInterval();
};

defineExpose({
  validate,
  verificationCodeData,
  isTimerLeft,
});
</script>

<style lang="scss" scoped>
.verify-code {
  margin-bottom: 5px;
}
.resend-title {
  font-size: 12px;
}
.resend-link {
  font-size: 14px;
}
</style>
