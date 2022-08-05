'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');

const paginationNextProps = {
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    default: 50
  },
  nextText: {
    type: String,
    default: ""
  }
};
const _sfc_main = vue.defineComponent({
  name: "ElPaginationNext",
  components: {
    ElIcon: index.ElIcon,
    ArrowRight: iconsVue.ArrowRight
  },
  props: paginationNextProps,
  emits: ["click"],
  setup(props) {
    const internalDisabled = vue.computed(() => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0);
    return {
      internalDisabled
    };
  }
});
const _hoisted_1 = ["disabled", "aria-disabled"];
const _hoisted_2 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_arrow_right = vue.resolveComponent("arrow-right");
  const _component_el_icon = vue.resolveComponent("el-icon");
  return vue.openBlock(), vue.createElementBlock("button", {
    type: "button",
    class: "btn-next",
    disabled: _ctx.internalDisabled,
    "aria-disabled": _ctx.internalDisabled,
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
  }, [
    _ctx.nextText ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, vue.toDisplayString(_ctx.nextText), 1)) : (vue.openBlock(), vue.createBlock(_component_el_icon, { key: 1 }, {
      default: vue.withCtx(() => [
        vue.createVNode(_component_arrow_right)
      ]),
      _: 1
    }))
  ], 8, _hoisted_1);
}
var Next = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Next;
//# sourceMappingURL=next.js.map
