'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
require('../../../constants/index.js');
var dialogContent = require('./dialog-content.js');
var props = require('../../../utils/vue/props.js');
var event = require('../../../constants/event.js');
var core = require('@vueuse/core');

const dialogProps = props.buildProps({
  ...dialogContent.dialogContentProps,
  appendToBody: {
    type: Boolean,
    default: false
  },
  beforeClose: {
    type: props.definePropType(Function)
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  modal: {
    type: Boolean,
    default: true
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  top: {
    type: String
  },
  modelValue: {
    type: Boolean,
    required: true
  },
  modalClass: String,
  width: {
    type: [String, Number]
  },
  zIndex: {
    type: Number
  },
  trapFocus: {
    type: Boolean,
    default: false
  }
});
const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [event.UPDATE_MODEL_EVENT]: (value) => core.isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true
};

exports.dialogEmits = dialogEmits;
exports.dialogProps = dialogProps;
//# sourceMappingURL=dialog.js.map
