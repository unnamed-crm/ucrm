'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var rand = require('../../../utils/rand.js');

const collapseItemProps = props.buildProps({
  title: {
    type: String,
    default: ""
  },
  name: {
    type: props.definePropType([String, Number]),
    default: () => rand.generateId()
  },
  disabled: Boolean
});

exports.collapseItemProps = collapseItemProps;
//# sourceMappingURL=collapse-item.js.map
