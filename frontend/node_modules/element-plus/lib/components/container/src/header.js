'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../hooks/index.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElHeader",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const ns = index.useNamespace("header");
    return {
      style: vue.computed(() => props.height ? {
        "--el-header-height": props.height
      } : {}),
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("header", {
    class: vue.normalizeClass(_ctx.ns.b()),
    style: vue.normalizeStyle(_ctx.style)
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 6);
}
var Header = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Header;
//# sourceMappingURL=header.js.map
