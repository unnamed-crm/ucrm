'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var iconsVue = require('@element-plus/icons-vue');
require('../../../constants/index.js');
require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var typescript = require('../../../utils/typescript.js');
var icon = require('../../../utils/vue/icon.js');
var validator = require('../../../utils/vue/validator.js');
var event = require('../../../constants/event.js');

const rateProps = props.buildProps({
  modelValue: {
    type: Number,
    default: 0
  },
  lowThreshold: {
    type: Number,
    default: 2
  },
  highThreshold: {
    type: Number,
    default: 4
  },
  max: {
    type: Number,
    default: 5
  },
  colors: {
    type: props.definePropType([Array, Object]),
    default: () => typescript.mutable(["", "", ""])
  },
  voidColor: {
    type: String,
    default: ""
  },
  disabledVoidColor: {
    type: String,
    default: ""
  },
  icons: {
    type: props.definePropType([Array, Object]),
    default: () => [iconsVue.StarFilled, iconsVue.StarFilled, iconsVue.StarFilled]
  },
  voidIcon: {
    type: icon.iconPropType,
    default: () => iconsVue.Star
  },
  disabledVoidIcon: {
    type: icon.iconPropType,
    default: () => iconsVue.StarFilled
  },
  disabled: {
    type: Boolean,
    default: false
  },
  allowHalf: {
    type: Boolean,
    default: false
  },
  showText: {
    type: Boolean,
    default: false
  },
  showScore: {
    type: Boolean,
    default: false
  },
  textColor: {
    type: String,
    default: ""
  },
  texts: {
    type: props.definePropType(Array),
    default: () => typescript.mutable([
      "Extremely bad",
      "Disappointed",
      "Fair",
      "Satisfied",
      "Surprise"
    ])
  },
  scoreTemplate: {
    type: String,
    default: "{value}"
  },
  size: {
    type: String,
    validator: validator.isValidComponentSize
  }
});
const rateEmits = {
  change: (value) => typeof value === "number",
  [event.UPDATE_MODEL_EVENT]: (value) => typeof value === "number"
};

exports.rateEmits = rateEmits;
exports.rateProps = rateProps;
//# sourceMappingURL=rate.js.map
