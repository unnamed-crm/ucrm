import { defineComponent, computed, resolveComponent, openBlock, createElementBlock, toDisplayString, createBlock, withCtx, createVNode } from 'vue';
import { ElIcon } from '../../../icon/index.mjs';
import { ArrowRight } from '@element-plus/icons-vue';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';

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
const _sfc_main = defineComponent({
  name: "ElPaginationNext",
  components: {
    ElIcon,
    ArrowRight
  },
  props: paginationNextProps,
  emits: ["click"],
  setup(props) {
    const internalDisabled = computed(() => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0);
    return {
      internalDisabled
    };
  }
});
const _hoisted_1 = ["disabled", "aria-disabled"];
const _hoisted_2 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_arrow_right = resolveComponent("arrow-right");
  const _component_el_icon = resolveComponent("el-icon");
  return openBlock(), createElementBlock("button", {
    type: "button",
    class: "btn-next",
    disabled: _ctx.internalDisabled,
    "aria-disabled": _ctx.internalDisabled,
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
  }, [
    _ctx.nextText ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(_ctx.nextText), 1)) : (openBlock(), createBlock(_component_el_icon, { key: 1 }, {
      default: withCtx(() => [
        createVNode(_component_arrow_right)
      ]),
      _: 1
    }))
  ], 8, _hoisted_1);
}
var Next = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Next as default };
//# sourceMappingURL=next.mjs.map
