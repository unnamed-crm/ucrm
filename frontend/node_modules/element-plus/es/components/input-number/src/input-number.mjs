import '../../../utils/index.mjs';
import '../../../constants/index.mjs';
import { buildProps } from '../../../utils/vue/props.mjs';
import { componentSizes } from '../../../constants/size.mjs';
import { isNumber } from '@vueuse/core';

const inputNumberProps = buildProps({
  step: {
    type: Number,
    default: 1
  },
  stepStrictly: {
    type: Boolean,
    default: false
  },
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY
  },
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY
  },
  modelValue: {
    type: Number
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    values: componentSizes
  },
  controls: {
    type: Boolean,
    default: true
  },
  controlsPosition: {
    type: String,
    default: "",
    values: ["", "right"]
  },
  name: String,
  label: String,
  placeholder: String,
  precision: {
    type: Number,
    validator: (val) => val >= 0 && val === Number.parseInt(`${val}`, 10)
  }
});
const inputNumberEmits = {
  change: (prev, cur) => prev !== cur,
  blur: (e) => e instanceof FocusEvent,
  focus: (e) => e instanceof FocusEvent,
  input: (val) => isNumber(val),
  "update:modelValue": (val) => isNumber(val) || val === void 0
};

export { inputNumberEmits, inputNumberProps };
//# sourceMappingURL=input-number.mjs.map
