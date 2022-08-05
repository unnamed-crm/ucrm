'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
require('../../../constants/index.js');
var props = require('../../../utils/vue/props.js');
var size = require('../../../constants/size.js');
var core = require('@vueuse/core');

const inputNumberProps = props.buildProps({
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
    values: size.componentSizes
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
  input: (val) => core.isNumber(val),
  "update:modelValue": (val) => core.isNumber(val) || val === void 0
};

exports.inputNumberEmits = inputNumberEmits;
exports.inputNumberProps = inputNumberProps;
//# sourceMappingURL=input-number.js.map
