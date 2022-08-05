'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var icon = require('../../../utils/vue/icon.js');

const messageTypes = ["success", "info", "warning", "error"];
const messageProps = props.buildProps({
  customClass: {
    type: String,
    default: ""
  },
  center: {
    type: Boolean,
    default: false
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3e3
  },
  icon: {
    type: icon.iconPropType,
    default: ""
  },
  id: {
    type: String,
    default: ""
  },
  message: {
    type: props.definePropType([
      String,
      Object,
      Function
    ]),
    default: ""
  },
  onClose: {
    type: props.definePropType(Function),
    required: false
  },
  showClose: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    values: messageTypes,
    default: "info"
  },
  offset: {
    type: Number,
    default: 20
  },
  zIndex: {
    type: Number,
    default: 0
  },
  grouping: {
    type: Boolean,
    default: false
  },
  repeatNum: {
    type: Number,
    default: 1
  }
});
const messageEmits = {
  destroy: () => true
};

exports.messageEmits = messageEmits;
exports.messageProps = messageProps;
exports.messageTypes = messageTypes;
//# sourceMappingURL=message.js.map
