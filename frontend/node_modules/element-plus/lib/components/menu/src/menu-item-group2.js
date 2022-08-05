'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../utils/index.js');
var menuItemGroup = require('./menu-item-group.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var error = require('../../../utils/error.js');

const COMPONENT_NAME = "ElMenuItemGroup";
const _sfc_main = vue.defineComponent({
  name: COMPONENT_NAME,
  props: menuItemGroup.menuItemGroupProps,
  setup() {
    const instance = vue.getCurrentInstance();
    const menu = vue.inject("rootMenu");
    if (!menu)
      error.throwError(COMPONENT_NAME, "can not inject root menu");
    const levelPadding = vue.computed(() => {
      if (menu.props.collapse)
        return 20;
      let padding = 20;
      let parent = instance.parent;
      while (parent && parent.type.name !== "ElMenu") {
        if (parent.type.name === "ElSubMenu") {
          padding += 20;
        }
        parent = parent.parent;
      }
      return padding;
    });
    return {
      levelPadding
    };
  }
});
const _hoisted_1 = { class: "el-menu-item-group" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("li", _hoisted_1, [
    vue.createElementVNode("div", {
      class: "el-menu-item-group__title",
      style: vue.normalizeStyle({ paddingLeft: `${_ctx.levelPadding}px` })
    }, [
      !_ctx.$slots.title ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
        vue.createTextVNode(vue.toDisplayString(_ctx.title), 1)
      ], 2112)) : vue.renderSlot(_ctx.$slots, "title", { key: 1 })
    ], 4),
    vue.createElementVNode("ul", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var MenuItemGroup = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = MenuItemGroup;
//# sourceMappingURL=menu-item-group2.js.map
