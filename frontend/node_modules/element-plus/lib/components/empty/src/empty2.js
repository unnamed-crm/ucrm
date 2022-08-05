'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../hooks/index.js');
var imgEmpty = require('./img-empty.js');
var empty = require('./empty.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElEmpty",
  components: {
    ImgEmpty: imgEmpty["default"]
  },
  props: empty.emptyProps,
  setup(props) {
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("empty");
    const emptyDescription = vue.computed(() => props.description || t("el.table.emptyText"));
    const imageStyle = vue.computed(() => ({
      width: props.imageSize ? `${props.imageSize}px` : ""
    }));
    return {
      ns,
      emptyDescription,
      imageStyle
    };
  }
});
const _hoisted_1 = ["src"];
const _hoisted_2 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_img_empty = vue.resolveComponent("img-empty");
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.ns.b())
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.ns.e("image")),
      style: vue.normalizeStyle(_ctx.imageStyle)
    }, [
      _ctx.image ? (vue.openBlock(), vue.createElementBlock("img", {
        key: 0,
        src: _ctx.image,
        ondragstart: "return false"
      }, null, 8, _hoisted_1)) : vue.renderSlot(_ctx.$slots, "image", { key: 1 }, () => [
        vue.createVNode(_component_img_empty)
      ])
    ], 6),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.ns.e("description"))
    }, [
      _ctx.$slots.description ? vue.renderSlot(_ctx.$slots, "description", { key: 0 }) : (vue.openBlock(), vue.createElementBlock("p", _hoisted_2, vue.toDisplayString(_ctx.emptyDescription), 1))
    ], 2),
    _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("div", {
      key: 0,
      class: vue.normalizeClass(_ctx.ns.e("bottom"))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 2)) : vue.createCommentVNode("v-if", true)
  ], 2);
}
var Empty = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Empty;
//# sourceMappingURL=empty2.js.map
