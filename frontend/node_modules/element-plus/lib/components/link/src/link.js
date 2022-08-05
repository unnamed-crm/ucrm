'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var icon = require('../../../utils/vue/icon.js');

const linkProps = props.buildProps({
  type: {
    type: String,
    values: ["primary", "success", "warning", "info", "danger", "default"],
    default: "default"
  },
  underline: {
    type: Boolean,
    default: true
  },
  disabled: { type: Boolean, default: false },
  href: { type: String, default: "" },
  icon: {
    type: icon.iconPropType,
    default: ""
  }
});
const linkEmits = {
  click: (evt) => evt instanceof MouseEvent
};

exports.linkEmits = linkEmits;
exports.linkProps = linkProps;
//# sourceMappingURL=link.js.map
