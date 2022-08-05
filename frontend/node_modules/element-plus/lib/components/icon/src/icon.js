'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const iconProps = props.buildProps({
  size: {
    type: props.definePropType([Number, String])
  },
  color: {
    type: String
  }
});

exports.iconProps = iconProps;
//# sourceMappingURL=icon.js.map
