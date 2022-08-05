'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var tokens = require('./tokens.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');

const _sfc_main = vue.defineComponent({
  name: "ElPopperProvider",
  inheritAttrs: false,
  setup() {
    const popperProvides = {
      triggerRef: vue.ref(null),
      popperInstanceRef: vue.ref(null),
      contentRef: vue.ref(null)
    };
    vue.provide(tokens.POPPER_INJECTION_KEY, popperProvides);
    return popperProvides;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.renderSlot(_ctx.$slots, "default");
}
var Popper = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Popper;
//# sourceMappingURL=popper2.js.map
