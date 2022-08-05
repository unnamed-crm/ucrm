import { defineComponent, openBlock, createBlock, Transition, mergeProps, toHandlers, withCtx, renderSlot } from 'vue';
import '../../../hooks/index.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElCollapseTransition",
  setup() {
    const ns = useNamespace("collapse-transition");
    return {
      ns,
      on: {
        beforeEnter(el) {
          if (!el.dataset)
            el.dataset = {};
          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;
          el.style.maxHeight = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        },
        enter(el) {
          el.dataset.oldOverflow = el.style.overflow;
          if (el.scrollHeight !== 0) {
            el.style.maxHeight = `${el.scrollHeight}px`;
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          } else {
            el.style.maxHeight = 0;
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          }
          el.style.overflow = "hidden";
        },
        afterEnter(el) {
          el.style.maxHeight = "";
          el.style.overflow = el.dataset.oldOverflow;
        },
        beforeLeave(el) {
          if (!el.dataset)
            el.dataset = {};
          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;
          el.dataset.oldOverflow = el.style.overflow;
          el.style.maxHeight = `${el.scrollHeight}px`;
          el.style.overflow = "hidden";
        },
        leave(el) {
          if (el.scrollHeight !== 0) {
            el.style.maxHeight = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
          }
        },
        afterLeave(el) {
          el.style.maxHeight = "";
          el.style.overflow = el.dataset.oldOverflow;
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }
      }
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, mergeProps({
    name: _ctx.ns.b()
  }, toHandlers(_ctx.on)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["name"]);
}
var CollapseTransition = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { CollapseTransition as default };
//# sourceMappingURL=collapse-transition.mjs.map
