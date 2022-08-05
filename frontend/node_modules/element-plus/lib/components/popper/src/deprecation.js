'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../hooks/index.js');
require('../../../utils/index.js');
var core = require('@vueuse/core');
var index = require('../../../hooks/use-deprecated/index.js');

function useDeprecateAppendToBody(scope, from) {
  const vm = vue.getCurrentInstance();
  const compatTeleported = vue.computed(() => {
    return core.isBoolean(vm.props[from]) ? vm.props[from] : vm.props.teleported;
  });
  index.useDeprecated({
    scope,
    from,
    replacement: "teleported",
    version: "2.1.0",
    ref: "https://element-plus.org/en-US/component/tooltip.html#attributes"
  }, vue.computed(() => core.isBoolean(vm.props[from])));
  return {
    compatTeleported
  };
}

exports.useDeprecateAppendToBody = useDeprecateAppendToBody;
//# sourceMappingURL=deprecation.js.map
