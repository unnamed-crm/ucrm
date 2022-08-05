'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var radio = require('./radio.js');
var props = require('../../../utils/vue/props.js');

const radioButtonProps = props.buildProps({
  ...radio.radioPropsBase,
  name: {
    type: String,
    default: ""
  }
});

exports.radioButtonProps = radioButtonProps;
//# sourceMappingURL=radio-button.js.map
