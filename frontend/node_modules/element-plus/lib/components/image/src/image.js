'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var typescript = require('../../../utils/typescript.js');
var core = require('@vueuse/core');

const imageProps = props.buildProps({
  appendToBody: {
    type: Boolean,
    default: void 0
  },
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  src: {
    type: String,
    default: ""
  },
  fit: {
    type: String,
    values: ["", "contain", "cover", "fill", "none", "scale-down"],
    default: ""
  },
  lazy: {
    type: Boolean,
    default: false
  },
  scrollContainer: {
    type: props.definePropType([String, Object])
  },
  previewSrcList: {
    type: props.definePropType(Array),
    default: () => typescript.mutable([])
  },
  previewTeleported: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number
  },
  initialIndex: {
    type: Number,
    default: 0
  }
});
const imageEmits = {
  error: (evt) => evt instanceof Event,
  switch: (val) => core.isNumber(val),
  close: () => true
};

exports.imageEmits = imageEmits;
exports.imageProps = imageProps;
//# sourceMappingURL=image.js.map
