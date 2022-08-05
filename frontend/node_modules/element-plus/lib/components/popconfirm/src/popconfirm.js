'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../button/index.js');
var iconsVue = require('@element-plus/icons-vue');
require('../../../utils/index.js');
require('../../tooltip/index.js');
var props = require('../../../utils/vue/props.js');
var button = require('../../button/src/button.js');
var icon = require('../../../utils/vue/icon.js');
var tooltip = require('../../tooltip/src/tooltip.js');

const popconfirmProps = props.buildProps({
  title: {
    type: String
  },
  confirmButtonText: {
    type: String
  },
  cancelButtonText: {
    type: String
  },
  confirmButtonType: {
    type: String,
    values: button.buttonTypes,
    default: "primary"
  },
  cancelButtonType: {
    type: String,
    values: button.buttonTypes,
    default: "text"
  },
  icon: {
    type: icon.iconPropType,
    default: iconsVue.QuestionFilled
  },
  iconColor: {
    type: String,
    default: "#f90"
  },
  hideIcon: {
    type: Boolean,
    default: false
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  onConfirm: {
    type: props.definePropType(Function)
  },
  onCancel: {
    type: props.definePropType(Function)
  },
  teleported: tooltip.useTooltipContentProps.teleported,
  persistent: tooltip.useTooltipContentProps.persistent
});

exports.popconfirmProps = popconfirmProps;
//# sourceMappingURL=popconfirm.js.map
