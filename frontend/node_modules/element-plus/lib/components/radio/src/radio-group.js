'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
require('../../../hooks/index.js');
var radio = require('./radio.js');
var props = require('../../../utils/vue/props.js');
var index = require('../../../hooks/use-common-props/index.js');

const radioGroupProps = props.buildProps({
  size: index.useSizeProp,
  disabled: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: ""
  },
  fill: {
    type: String,
    default: ""
  },
  textColor: {
    type: String,
    default: ""
  }
});
const radioGroupEmits = radio.radioEmits;

exports.radioGroupEmits = radioGroupEmits;
exports.radioGroupProps = radioGroupProps;
//# sourceMappingURL=radio-group.js.map
