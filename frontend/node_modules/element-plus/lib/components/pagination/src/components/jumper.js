'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../../hooks/index.js');
var index = require('../../../input/index.js');
var usePagination = require('../usePagination.js');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');
var index$1 = require('../../../../hooks/use-locale/index.js');
var index$2 = require('../../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElPaginationJumper",
  components: {
    ElInput: index.ElInput
  },
  setup() {
    const { t } = index$1.useLocale();
    const ns = index$2.useNamespace("pagination");
    const { pageCount, disabled, currentPage, changeEvent } = usePagination.usePagination();
    const userInput = vue.ref();
    const innerValue = vue.computed(() => {
      var _a;
      return (_a = userInput.value) != null ? _a : currentPage == null ? void 0 : currentPage.value;
    });
    function handleInput(val) {
      userInput.value = +val;
    }
    function handleChange(val) {
      val = Math.trunc(+val);
      changeEvent == null ? void 0 : changeEvent(+val);
      userInput.value = void 0;
    }
    return {
      ns,
      pageCount,
      disabled,
      innerValue,
      t,
      handleInput,
      handleChange
    };
  }
});
const _hoisted_1 = ["disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = vue.resolveComponent("el-input");
  return vue.openBlock(), vue.createElementBlock("span", {
    class: vue.normalizeClass(_ctx.ns.e("jump")),
    disabled: _ctx.disabled
  }, [
    vue.createTextVNode(vue.toDisplayString(_ctx.t("el.pagination.goto")) + " ", 1),
    vue.createVNode(_component_el_input, {
      size: "small",
      class: vue.normalizeClass([_ctx.ns.e("editor"), _ctx.ns.is("in-pagination")]),
      min: 1,
      max: _ctx.pageCount,
      disabled: _ctx.disabled,
      "model-value": _ctx.innerValue,
      type: "number",
      "onUpdate:modelValue": _ctx.handleInput,
      onChange: _ctx.handleChange
    }, null, 8, ["class", "max", "disabled", "model-value", "onUpdate:modelValue", "onChange"]),
    vue.createTextVNode(" " + vue.toDisplayString(_ctx.t("el.pagination.pageClassifier")), 1)
  ], 10, _hoisted_1);
}
var Jumper = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Jumper;
//# sourceMappingURL=jumper.js.map
