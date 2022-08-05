'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var shared = require('@vue/shared');

const menuItemProps = props.buildProps({
  index: {
    type: props.definePropType([String, null]),
    default: null
  },
  route: {
    type: props.definePropType([String, Object])
  },
  disabled: Boolean
});
const menuItemEmits = {
  click: (item) => shared.isString(item.index) && Array.isArray(item.indexPath)
};

exports.menuItemEmits = menuItemEmits;
exports.menuItemProps = menuItemProps;
//# sourceMappingURL=menu-item.js.map
