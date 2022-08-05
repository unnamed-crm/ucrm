'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../hooks/index.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElAside",
  props: {
    width: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const ns = index.useNamespace("aside");
    return {
      style: vue.computed(() => {
        return props.width ? { "--el-aside-width": props.width } : {};
      }),
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("aside", {
    class: vue.normalizeClass(_ctx.ns.b()),
    style: vue.normalizeStyle(_ctx.style)
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 6);
}
var Aside = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Aside;
//# sourceMappingURL=aside.js.map
