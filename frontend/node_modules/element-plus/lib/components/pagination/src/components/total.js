'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../../hooks/index.js');
var usePagination = require('../usePagination.js');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../../hooks/use-locale/index.js');
var index$1 = require('../../../../hooks/use-namespace/index.js');

const paginationTotalProps = {
  total: {
    type: Number,
    default: 1e3
  }
};
const _sfc_main = vue.defineComponent({
  name: "ElPaginationTotal",
  props: paginationTotalProps,
  setup() {
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("pagination");
    const { disabled } = usePagination.usePagination();
    return {
      t,
      ns,
      disabled
    };
  }
});
const _hoisted_1 = ["disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("span", {
    class: vue.normalizeClass(_ctx.ns.e("total")),
    disabled: _ctx.disabled
  }, vue.toDisplayString(_ctx.t("el.pagination.total", {
    total: _ctx.total
  })), 11, _hoisted_1);
}
var Total = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Total;
//# sourceMappingURL=total.js.map
