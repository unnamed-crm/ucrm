'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
require('../../../constants/index.js');
var core = require('@vueuse/core');
var props = require('../../../utils/vue/props.js');
var typescript = require('../../../utils/typescript.js');
var event = require('../../../constants/event.js');

const emitChangeFn = (value) => typeof core.isNumber(value);
const collapseProps = props.buildProps({
  accordion: Boolean,
  modelValue: {
    type: props.definePropType([Array, String, Number]),
    default: () => typescript.mutable([])
  }
});
const collapseEmits = {
  [event.UPDATE_MODEL_EVENT]: emitChangeFn,
  [event.CHANGE_EVENT]: emitChangeFn
};

exports.collapseEmits = collapseEmits;
exports.collapseProps = collapseProps;
exports.emitChangeFn = emitChangeFn;
//# sourceMappingURL=collapse.js.map
