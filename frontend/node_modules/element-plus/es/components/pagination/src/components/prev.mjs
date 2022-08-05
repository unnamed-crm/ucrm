import { defineComponent, computed, resolveComponent, openBlock, createElementBlock, toDisplayString, createBlock, withCtx, createVNode } from 'vue';
import { ElIcon } from '../../../icon/index.mjs';
import { ArrowLeft } from '@element-plus/icons-vue';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';

const paginationPrevProps = {
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  prevText: {
    type: String,
    default: ""
  }
};
const _sfc_main = defineComponent({
  name: "ElPaginationPrev",
  components: {
    ElIcon,
    ArrowLeft
  },
  props: paginationPrevProps,
  emits: ["click"],
  setup(props) {
    const internalDisabled = computed(() => props.disabled || props.currentPage <= 1);
    return {
      internalDisabled
    };
  }
});
const _hoisted_1 = ["disabled", "aria-disabled"];
const _hoisted_2 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_arrow_left = resolveComponent("arrow-left");
  const _component_el_icon = resolveComponent("el-icon");
  return openBlock(), createElementBlock("button", {
    type: "button",
    class: "btn-prev",
    disabled: _ctx.internalDisabled,
    "aria-disabled": _ctx.internalDisabled,
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
  }, [
    _ctx.prevText ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(_ctx.prevText), 1)) : (openBlock(), createBlock(_component_el_icon, { key: 1 }, {
      default: withCtx(() => [
        createVNode(_component_arrow_left)
      ]),
      _: 1
    }))
  ], 8, _hoisted_1);
}
var Prev = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Prev as default };
//# sourceMappingURL=prev.mjs.map
