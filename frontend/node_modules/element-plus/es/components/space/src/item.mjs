import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, renderSlot } from 'vue';
import '../../../utils/index.mjs';
import '../../../hooks/index.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { buildProps } from '../../../utils/vue/props.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const spaceItem = buildProps({
  prefixCls: {
    type: String,
    default: ""
  }
});
const _sfc_main = defineComponent({
  props: spaceItem,
  setup(props) {
    const ns = useNamespace("space");
    const classes = computed(() => `${props.prefixCls || ns.b()}__item`);
    return {
      classes
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var Item = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Item as default };
//# sourceMappingURL=item.mjs.map
