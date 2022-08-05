import { defineComponent, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, createBlock, withCtx, resolveDynamicComponent, createCommentVNode, renderSlot, toDisplayString } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import '../../../hooks/index.mjs';
import { timelineItemProps } from './timeline-item.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElTimelineItem",
  components: {
    ElIcon
  },
  props: timelineItemProps,
  setup() {
    const ns = useNamespace("timeline-item");
    return {
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass([_ctx.ns.b(), { [_ctx.ns.e("center")]: _ctx.center }])
  }, [
    createElementVNode("div", {
      class: normalizeClass(_ctx.ns.e("tail"))
    }, null, 2),
    !_ctx.$slots.dot ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass([
        _ctx.ns.e("node"),
        _ctx.ns.em("node", _ctx.size || ""),
        _ctx.ns.em("node", _ctx.type || ""),
        _ctx.ns.is("hollow", _ctx.hollow)
      ]),
      style: normalizeStyle({
        backgroundColor: _ctx.color
      })
    }, [
      _ctx.icon ? (openBlock(), createBlock(_component_el_icon, {
        key: 0,
        class: normalizeClass(_ctx.ns.e("icon"))
      }, {
        default: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
        ]),
        _: 1
      }, 8, ["class"])) : createCommentVNode("v-if", true)
    ], 6)) : createCommentVNode("v-if", true),
    _ctx.$slots.dot ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(_ctx.ns.e("dot"))
    }, [
      renderSlot(_ctx.$slots, "dot")
    ], 2)) : createCommentVNode("v-if", true),
    createElementVNode("div", {
      class: normalizeClass(_ctx.ns.e("wrapper"))
    }, [
      !_ctx.hideTimestamp && _ctx.placement === "top" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass([_ctx.ns.e("timestamp"), _ctx.ns.is("top")])
      }, toDisplayString(_ctx.timestamp), 3)) : createCommentVNode("v-if", true),
      createElementVNode("div", {
        class: normalizeClass(_ctx.ns.e("content"))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2),
      !_ctx.hideTimestamp && _ctx.placement === "bottom" ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass([_ctx.ns.e("timestamp"), _ctx.ns.is("bottom")])
      }, toDisplayString(_ctx.timestamp), 3)) : createCommentVNode("v-if", true)
    ], 2)
  ], 2);
}
var TimelineItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { TimelineItem as default };
//# sourceMappingURL=timeline-item2.mjs.map
