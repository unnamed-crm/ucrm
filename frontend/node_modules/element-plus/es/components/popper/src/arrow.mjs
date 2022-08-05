import { defineComponent, ref, inject, watch, onMounted, unref, onBeforeUnmount, openBlock, createElementBlock, normalizeClass } from 'vue';
import '../../../hooks/index.mjs';
import { usePopperArrowProps } from './popper.mjs';
import { POPPER_CONTENT_INJECTION_KEY } from './tokens.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElPopperArrow",
  props: usePopperArrowProps,
  setup(props) {
    const ns = useNamespace("popper");
    const arrowRef = ref(null);
    const popperContentInjection = inject(POPPER_CONTENT_INJECTION_KEY, void 0);
    watch(() => props.arrowOffset, (val) => {
      popperContentInjection.arrowOffset.value = val;
    });
    onMounted(() => {
      popperContentInjection.arrowRef.value = unref(arrowRef);
    });
    onBeforeUnmount(() => {
      popperContentInjection.arrowRef.value = null;
    });
    return {
      ns,
      arrowRef
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", {
    ref: "arrowRef",
    class: normalizeClass(_ctx.ns.e("arrow")),
    "data-popper-arrow": ""
  }, null, 2);
}
var ElPopperArrow = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { ElPopperArrow as default };
//# sourceMappingURL=arrow.mjs.map
