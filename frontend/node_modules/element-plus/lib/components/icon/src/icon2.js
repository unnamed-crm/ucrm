'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../utils/index.js');
require('../../../hooks/index.js');
var icon = require('./icon.js');
var index = require('../../../hooks/use-namespace/index.js');
var types = require('../../../utils/types.js');
var style = require('../../../utils/vue/style.js');

const __default__ = {
  name: "ElIcon",
  inheritAttrs: false
};
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: icon.iconProps,
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("icon");
    const style$1 = vue.computed(() => {
      if (!props.size && !props.color)
        return {};
      return {
        fontSize: types.isUndefined(props.size) ? void 0 : style.addUnit(props.size),
        "--color": props.color
      };
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
        class: vue.unref(ns).b(),
        style: vue.unref(style$1)
      }, _ctx.$attrs), [
        vue.renderSlot(_ctx.$slots, "default")
      ], 16);
    };
  }
});

exports["default"] = _sfc_main;
//# sourceMappingURL=icon2.js.map
