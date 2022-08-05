'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const cardProps = props.buildProps({
  header: {
    type: String,
    default: ""
  },
  bodyStyle: {
    type: props.definePropType([String, Object, Array]),
    default: ""
  },
  shadow: {
    type: String,
    default: "always"
  }
});

exports.cardProps = cardProps;
//# sourceMappingURL=card.js.map
