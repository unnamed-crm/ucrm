import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, renderSlot } from 'vue';
import '../../../hooks/index.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElContainer",
  props: {
    direction: {
      type: String,
      default: ""
    }
  },
  setup(props, { slots }) {
    const ns = useNamespace("container");
    const isVertical = computed(() => {
      if (props.direction === "vertical") {
        return true;
      } else if (props.direction === "horizontal") {
        return false;
      }
      if (slots && slots.default) {
        const vNodes = slots.default();
        return vNodes.some((vNode) => {
          const tag = vNode.type.name;
          return tag === "ElHeader" || tag === "ElFooter";
        });
      } else {
        return false;
      }
    });
    return {
      isVertical,
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", {
    class: normalizeClass([_ctx.ns.b(), _ctx.ns.is("vertical", _ctx.isVertical)])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var Container = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Container as default };
//# sourceMappingURL=container.mjs.map
