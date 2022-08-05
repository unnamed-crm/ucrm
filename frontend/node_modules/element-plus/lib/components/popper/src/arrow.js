'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../hooks/index.js');
var popper = require('./popper.js');
var tokens = require('./tokens.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElPopperArrow",
  props: popper.usePopperArrowProps,
  setup(props) {
    const ns = index.useNamespace("popper");
    const arrowRef = vue.ref(null);
    const popperContentInjection = vue.inject(tokens.POPPER_CONTENT_INJECTION_KEY, void 0);
    vue.watch(() => props.arrowOffset, (val) => {
      popperContentInjection.arrowOffset.value = val;
    });
    vue.onMounted(() => {
      popperContentInjection.arrowRef.value = vue.unref(arrowRef);
    });
    vue.onBeforeUnmount(() => {
      popperContentInjection.arrowRef.value = null;
    });
    return {
      ns,
      arrowRef
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("span", {
    ref: "arrowRef",
    class: vue.normalizeClass(_ctx.ns.e("arrow")),
    "data-popper-arrow": ""
  }, null, 2);
}
var ElPopperArrow = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = ElPopperArrow;
//# sourceMappingURL=arrow.js.map
