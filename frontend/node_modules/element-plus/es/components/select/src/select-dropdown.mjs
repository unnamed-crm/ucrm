import { defineComponent, inject, computed, ref, onMounted, onBeforeUnmount, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot } from 'vue';
import '../../../hooks/index.mjs';
import '../../../utils/index.mjs';
import { selectKey } from './token.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { addResizeListener, removeResizeListener } from '../../../utils/dom/resize-event.mjs';

const _sfc_main = defineComponent({
  name: "ElSelectDropdown",
  componentName: "ElSelectDropdown",
  setup() {
    const select = inject(selectKey);
    const ns = useNamespace("select");
    const popperClass = computed(() => select.props.popperClass);
    const isMultiple = computed(() => select.props.multiple);
    const isFitInputWidth = computed(() => select.props.fitInputWidth);
    const minWidth = ref("");
    function updateMinWidth() {
      var _a;
      minWidth.value = `${(_a = select.selectWrapper) == null ? void 0 : _a.getBoundingClientRect().width}px`;
    }
    onMounted(() => {
      updateMinWidth();
      addResizeListener(select.selectWrapper, updateMinWidth);
    });
    onBeforeUnmount(() => {
      removeResizeListener(select.selectWrapper, updateMinWidth);
    });
    return {
      ns,
      minWidth,
      popperClass,
      isMultiple,
      isFitInputWidth
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.ns.b("dropdown"), _ctx.ns.is("multiple", _ctx.isMultiple), _ctx.popperClass]),
    style: normalizeStyle({ [_ctx.isFitInputWidth ? "width" : "minWidth"]: _ctx.minWidth })
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 6);
}
var ElSelectMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { ElSelectMenu as default };
//# sourceMappingURL=select-dropdown.mjs.map
