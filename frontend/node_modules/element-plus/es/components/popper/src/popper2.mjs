import { defineComponent, ref, provide, renderSlot } from 'vue';
import { POPPER_INJECTION_KEY } from './tokens.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';

const _sfc_main = defineComponent({
  name: "ElPopperProvider",
  inheritAttrs: false,
  setup() {
    const popperProvides = {
      triggerRef: ref(null),
      popperInstanceRef: ref(null),
      contentRef: ref(null)
    };
    provide(POPPER_INJECTION_KEY, popperProvides);
    return popperProvides;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var Popper = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Popper as default };
//# sourceMappingURL=popper2.mjs.map
