import { defineComponent, openBlock, createBlock, Transition, mergeProps, withCtx, renderSlot } from 'vue';
import '../../../utils/index.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { addClass, removeClass, hasClass } from '../../../utils/dom/style.mjs';

const _sfc_main = defineComponent({
  name: "ElMenuCollapseTransition",
  setup() {
    const listeners = {
      onBeforeEnter: (el) => el.style.opacity = "0.2",
      onEnter(el, done) {
        addClass(el, "el-opacity-transition");
        el.style.opacity = "1";
        done();
      },
      onAfterEnter(el) {
        removeClass(el, "el-opacity-transition");
        el.style.opacity = "";
      },
      onBeforeLeave(el) {
        if (!el.dataset) {
          ;
          el.dataset = {};
        }
        if (hasClass(el, "el-menu--collapse")) {
          removeClass(el, "el-menu--collapse");
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          addClass(el, "el-menu--collapse");
        } else {
          addClass(el, "el-menu--collapse");
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          removeClass(el, "el-menu--collapse");
        }
        el.style.width = `${el.scrollWidth}px`;
        el.style.overflow = "hidden";
      },
      onLeave(el) {
        addClass(el, "horizontal-collapse-transition");
        el.style.width = `${el.dataset.scrollWidth}px`;
      }
    };
    return {
      listeners
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, mergeProps({ mode: "out-in" }, _ctx.listeners), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
var ElMenuCollapseTransition = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { ElMenuCollapseTransition as default };
//# sourceMappingURL=menu-collapse-transition.mjs.map
