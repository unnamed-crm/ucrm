import { defineComponent, ref, computed, resolveComponent, resolveDirective, openBlock, createBlock, Teleport, createVNode, Transition, withCtx, withDirectives, createElementBlock, normalizeClass, normalizeStyle, withModifiers, renderSlot, createElementVNode, toDisplayString, createCommentVNode, vShow } from 'vue';
import { Close } from '@element-plus/icons-vue';
import { ElOverlay } from '../../overlay/index.mjs';
import '../../dialog/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import '../../../directives/index.mjs';
import '../../../hooks/index.mjs';
import { drawerProps, drawerEmits } from './drawer.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import TrapFocus from '../../../directives/trap-focus/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useDialog } from '../../dialog/src/use-dialog.mjs';

const _sfc_main = defineComponent({
  name: "ElDrawer",
  components: {
    ElOverlay,
    ElIcon,
    Close
  },
  directives: {
    TrapFocus
  },
  props: drawerProps,
  emits: drawerEmits,
  setup(props, ctx) {
    const drawerRef = ref();
    const ns = useNamespace("drawer");
    const isHorizontal = computed(() => props.direction === "rtl" || props.direction === "ltr");
    const drawerSize = computed(() => typeof props.size === "number" ? `${props.size}px` : props.size);
    return {
      ...useDialog(props, ctx, drawerRef),
      drawerRef,
      isHorizontal,
      drawerSize,
      ns
    };
  }
});
const _hoisted_1 = ["aria-labelledby", "aria-label"];
const _hoisted_2 = ["id"];
const _hoisted_3 = ["title"];
const _hoisted_4 = ["aria-label"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_close = resolveComponent("close");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_overlay = resolveComponent("el-overlay");
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createBlock(Teleport, {
    to: "body",
    disabled: !_ctx.appendToBody
  }, [
    createVNode(Transition, {
      name: _ctx.ns.b("fade"),
      onAfterEnter: _ctx.afterEnter,
      onAfterLeave: _ctx.afterLeave,
      onBeforeLeave: _ctx.beforeLeave
    }, {
      default: withCtx(() => [
        withDirectives(createVNode(_component_el_overlay, {
          mask: _ctx.modal,
          "overlay-class": _ctx.modalClass,
          "z-index": _ctx.zIndex,
          onClick: _ctx.onModalClick
        }, {
          default: withCtx(() => [
            withDirectives((openBlock(), createElementBlock("div", {
              ref: "drawerRef",
              "aria-modal": "true",
              "aria-labelledby": _ctx.ns.e("title"),
              "aria-label": _ctx.title,
              class: normalizeClass([_ctx.ns.b(), _ctx.direction, _ctx.visible && "open", _ctx.customClass]),
              style: normalizeStyle(_ctx.isHorizontal ? "width: " + _ctx.drawerSize : "height: " + _ctx.drawerSize),
              role: "dialog",
              onClick: _cache[1] || (_cache[1] = withModifiers(() => {
              }, ["stop"]))
            }, [
              _ctx.withHeader ? (openBlock(), createElementBlock("header", {
                key: 0,
                id: _ctx.ns.e("title"),
                class: normalizeClass(_ctx.ns.e("header"))
              }, [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createElementVNode("span", {
                    role: "heading",
                    title: _ctx.title
                  }, toDisplayString(_ctx.title), 9, _hoisted_3)
                ]),
                _ctx.showClose ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  "aria-label": "close " + (_ctx.title || "drawer"),
                  class: normalizeClass(_ctx.ns.e("close-btn")),
                  type: "button",
                  onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
                }, [
                  createVNode(_component_el_icon, {
                    class: normalizeClass(_ctx.ns.e("close"))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_close)
                    ]),
                    _: 1
                  }, 8, ["class"])
                ], 10, _hoisted_4)) : createCommentVNode("v-if", true)
              ], 10, _hoisted_2)) : createCommentVNode("v-if", true),
              _ctx.rendered ? (openBlock(), createElementBlock("section", {
                key: 1,
                class: normalizeClass(_ctx.ns.e("body"))
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)) : createCommentVNode("v-if", true),
              _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
                key: 2,
                class: normalizeClass(_ctx.ns.e("footer"))
              }, [
                renderSlot(_ctx.$slots, "footer")
              ], 2)) : createCommentVNode("v-if", true)
            ], 14, _hoisted_1)), [
              [_directive_trap_focus]
            ])
          ]),
          _: 3
        }, 8, ["mask", "overlay-class", "z-index", "onClick"]), [
          [vShow, _ctx.visible]
        ])
      ]),
      _: 3
    }, 8, ["name", "onAfterEnter", "onAfterLeave", "onBeforeLeave"])
  ], 8, ["disabled"]);
}
var Drawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Drawer as default };
//# sourceMappingURL=drawer2.mjs.map
