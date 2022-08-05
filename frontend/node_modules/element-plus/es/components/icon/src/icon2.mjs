import { defineComponent, computed, openBlock, createElementBlock, mergeProps, unref, renderSlot } from 'vue';
import '../../../utils/index.mjs';
import '../../../hooks/index.mjs';
import { iconProps } from './icon.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isUndefined } from '../../../utils/types.mjs';
import { addUnit } from '../../../utils/vue/style.mjs';

const __default__ = {
  name: "ElIcon",
  inheritAttrs: false
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = computed(() => {
      if (!props.size && !props.color)
        return {};
      return {
        fontSize: isUndefined(props.size) ? void 0 : addUnit(props.size),
        "--color": props.color
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("i", mergeProps({
        class: unref(ns).b(),
        style: unref(style)
      }, _ctx.$attrs), [
        renderSlot(_ctx.$slots, "default")
      ], 16);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=icon2.mjs.map
