'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var icon = require('../../../utils/vue/icon.js');

const avatarProps = props.buildProps({
  size: {
    type: [Number, String],
    values: ["large", "default", "small"],
    default: "default",
    validator: (val) => typeof val === "number"
  },
  shape: {
    type: String,
    values: ["circle", "square"],
    default: "circle"
  },
  icon: {
    type: icon.iconPropType
  },
  src: {
    type: String,
    default: ""
  },
  alt: String,
  srcSet: String,
  fit: {
    type: props.definePropType(String),
    default: "cover"
  }
});
const avatarEmits = {
  error: (evt) => evt instanceof Event
};

exports.avatarEmits = avatarEmits;
exports.avatarProps = avatarProps;
//# sourceMappingURL=avatar.js.map
