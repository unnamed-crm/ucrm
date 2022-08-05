'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var iconsVue = require('@element-plus/icons-vue');
var index = require('../../overlay/index.js');
require('../../dialog/index.js');
var index$1 = require('../../icon/index.js');
require('../../../directives/index.js');
require('../../../hooks/index.js');
var drawer = require('./drawer.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$2 = require('../../../directives/trap-focus/index.js');
var index$3 = require('../../../hooks/use-namespace/index.js');
var useDialog = require('../../dialog/src/use-dialog.js');

const _sfc_main = vue.defineComponent({
  name: "ElDrawer",
  components: {
    ElOverlay: index.ElOverlay,
    ElIcon: index$1.ElIcon,
    Close: iconsVue.Close
  },
  directives: {
    TrapFocus: index$2["default"]
  },
  props: drawer.drawerProps,
  emits: drawer.drawerEmits,
  setup(props, ctx) {
    const drawerRef = vue.ref();
    const ns = index$3.useNamespace("drawer");
    const isHorizontal = vue.computed(() => props.direction === "rtl" || props.direction === "ltr");
    const drawerSize = vue.computed(() => typeof props.size === "number" ? `${props.size}px` : props.size);
    return {
      ...useDialog.useDialog(props, ctx, drawerRef),
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
  const _component_close = vue.resolveComponent("close");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_overlay = vue.resolveComponent("el-overlay");
  const _directive_trap_focus = vue.resolveDirective("trap-focus");
  return vue.openBlock(), vue.createBlock(vue.Teleport, {
    to: "body",
    disabled: !_ctx.appendToBody
  }, [
    vue.createVNode(vue.Transition, {
      name: _ctx.ns.b("fade"),
      onAfterEnter: _ctx.afterEnter,
      onAfterLeave: _ctx.afterLeave,
      onBeforeLeave: _ctx.beforeLeave
    }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createVNode(_component_el_overlay, {
          mask: _ctx.modal,
          "overlay-class": _ctx.modalClass,
          "z-index": _ctx.zIndex,
          onClick: _ctx.onModalClick
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
              ref: "drawerRef",
              "aria-modal": "true",
              "aria-labelledby": _ctx.ns.e("title"),
              "aria-label": _ctx.title,
              class: vue.normalizeClass([_ctx.ns.b(), _ctx.direction, _ctx.visible && "open", _ctx.customClass]),
              style: vue.normalizeStyle(_ctx.isHorizontal ? "width: " + _ctx.drawerSize : "height: " + _ctx.drawerSize),
              role: "dialog",
              onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
              }, ["stop"]))
            }, [
              _ctx.withHeader ? (vue.openBlock(), vue.createElementBlock("header", {
                key: 0,
                id: _ctx.ns.e("title"),
                class: vue.normalizeClass(_ctx.ns.e("header"))
              }, [
                vue.renderSlot(_ctx.$slots, "title", {}, () => [
                  vue.createElementVNode("span", {
                    role: "heading",
                    title: _ctx.title
                  }, vue.toDisplayString(_ctx.title), 9, _hoisted_3)
                ]),
                _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 0,
                  "aria-label": "close " + (_ctx.title || "drawer"),
                  class: vue.normalizeClass(_ctx.ns.e("close-btn")),
                  type: "button",
                  onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
                }, [
                  vue.createVNode(_component_el_icon, {
                    class: vue.normalizeClass(_ctx.ns.e("close"))
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_close)
                    ]),
                    _: 1
                  }, 8, ["class"])
                ], 10, _hoisted_4)) : vue.createCommentVNode("v-if", true)
              ], 10, _hoisted_2)) : vue.createCommentVNode("v-if", true),
              _ctx.rendered ? (vue.openBlock(), vue.createElementBlock("section", {
                key: 1,
                class: vue.normalizeClass(_ctx.ns.e("body"))
              }, [
                vue.renderSlot(_ctx.$slots, "default")
              ], 2)) : vue.createCommentVNode("v-if", true),
              _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 2,
                class: vue.normalizeClass(_ctx.ns.e("footer"))
              }, [
                vue.renderSlot(_ctx.$slots, "footer")
              ], 2)) : vue.createCommentVNode("v-if", true)
            ], 14, _hoisted_1)), [
              [_directive_trap_focus]
            ])
          ]),
          _: 3
        }, 8, ["mask", "overlay-class", "z-index", "onClick"]), [
          [vue.vShow, _ctx.visible]
        ])
      ]),
      _: 3
    }, 8, ["name", "onAfterEnter", "onAfterLeave", "onBeforeLeave"])
  ], 8, ["disabled"]);
}
var Drawer = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Drawer;
//# sourceMappingURL=drawer2.js.map
