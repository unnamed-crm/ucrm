'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../utils/index.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var style = require('../../../utils/dom/style.js');

const _sfc_main = vue.defineComponent({
  name: "ElMenuCollapseTransition",
  setup() {
    const listeners = {
      onBeforeEnter: (el) => el.style.opacity = "0.2",
      onEnter(el, done) {
        style.addClass(el, "el-opacity-transition");
        el.style.opacity = "1";
        done();
      },
      onAfterEnter(el) {
        style.removeClass(el, "el-opacity-transition");
        el.style.opacity = "";
      },
      onBeforeLeave(el) {
        if (!el.dataset) {
          ;
          el.dataset = {};
        }
        if (style.hasClass(el, "el-menu--collapse")) {
          style.removeClass(el, "el-menu--collapse");
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          style.addClass(el, "el-menu--collapse");
        } else {
          style.addClass(el, "el-menu--collapse");
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          style.removeClass(el, "el-menu--collapse");
        }
        el.style.width = `${el.scrollWidth}px`;
        el.style.overflow = "hidden";
      },
      onLeave(el) {
        style.addClass(el, "horizontal-collapse-transition");
        el.style.width = `${el.dataset.scrollWidth}px`;
      }
    };
    return {
      listeners
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Transition, vue.mergeProps({ mode: "out-in" }, _ctx.listeners), {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
var ElMenuCollapseTransition = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = ElMenuCollapseTransition;
//# sourceMappingURL=menu-collapse-transition.js.map
