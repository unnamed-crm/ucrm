'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../utils/index.js');
require('../../../hooks/index.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');
var error = require('../../../utils/error.js');

const CARD_SCALE = 0.83;
const _sfc_main = vue.defineComponent({
  name: "ElCarouselItem",
  props: {
    name: { type: String, default: "" },
    label: {
      type: [String, Number],
      default: ""
    }
  },
  setup(props) {
    const ns = index.useNamespace("carousel");
    const instance = vue.getCurrentInstance();
    const data = vue.reactive({
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    });
    const injectCarouselScope = vue.inject("injectCarouselScope");
    const parentDirection = vue.computed(() => {
      return injectCarouselScope.direction;
    });
    const itemStyle = vue.computed(() => {
      const translateType = parentDirection.value === "vertical" ? "translateY" : "translateX";
      const value = `${translateType}(${data.translate}px) scale(${data.scale})`;
      const style = {
        transform: value
      };
      return style;
    });
    function processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    }
    function calcCardTranslate(index, activeIndex) {
      var _a;
      const parentWidth = ((_a = injectCarouselScope.root.value) == null ? void 0 : _a.offsetWidth) || 0;
      if (data.inStage) {
        return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
      } else if (index < activeIndex) {
        return -(1 + CARD_SCALE) * parentWidth / 4;
      } else {
        return (3 + CARD_SCALE) * parentWidth / 4;
      }
    }
    function calcTranslate(index, activeIndex, isVertical) {
      var _a, _b;
      const distance = (isVertical ? (_a = injectCarouselScope.root.value) == null ? void 0 : _a.offsetHeight : (_b = injectCarouselScope.root.value) == null ? void 0 : _b.offsetWidth) || 0;
      return distance * (index - activeIndex);
    }
    const translateItem = (index, activeIndex, oldIndex) => {
      const parentType = injectCarouselScope.type;
      const length = injectCarouselScope.items.value.length;
      if (parentType !== "card" && oldIndex !== void 0) {
        data.animating = index === activeIndex || index === oldIndex;
      }
      if (index !== activeIndex && length > 2 && injectCarouselScope.loop) {
        index = processIndex(index, activeIndex, length);
      }
      if (parentType === "card") {
        if (parentDirection.value === "vertical") {
          error.debugWarn("Carousel", "vertical direction is not supported in card mode");
        }
        data.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        data.active = index === activeIndex;
        data.translate = calcCardTranslate(index, activeIndex);
        data.scale = data.active ? 1 : CARD_SCALE;
      } else {
        data.active = index === activeIndex;
        const isVertical = parentDirection.value === "vertical";
        data.translate = calcTranslate(index, activeIndex, isVertical);
      }
      data.ready = true;
    };
    function handleItemClick() {
      if (injectCarouselScope && injectCarouselScope.type === "card") {
        const index = injectCarouselScope.items.value.map((d) => d.uid).indexOf(instance.uid);
        injectCarouselScope.setActiveItem(index);
      }
    }
    vue.onMounted(() => {
      if (injectCarouselScope.addItem) {
        injectCarouselScope.addItem({
          uid: instance.uid,
          ...props,
          ...vue.toRefs(data),
          translateItem
        });
      }
    });
    vue.onUnmounted(() => {
      if (injectCarouselScope.removeItem) {
        injectCarouselScope.removeItem(instance.uid);
      }
    });
    return {
      data,
      itemStyle,
      translateItem,
      type: injectCarouselScope.type,
      handleItemClick,
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass([
      _ctx.ns.e("item"),
      _ctx.ns.is("active", _ctx.data.active),
      _ctx.ns.is("in-stage", _ctx.data.inStage),
      _ctx.ns.is("hover", _ctx.data.hover),
      _ctx.ns.is("animating", _ctx.data.animating),
      { [_ctx.ns.em("item", "card")]: _ctx.type === "card" }
    ]),
    style: vue.normalizeStyle(_ctx.itemStyle),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleItemClick && _ctx.handleItemClick(...args))
  }, [
    _ctx.type === "card" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      key: 0,
      class: vue.normalizeClass(_ctx.ns.e("mask"))
    }, null, 2)), [
      [vue.vShow, !_ctx.data.active]
    ]) : vue.createCommentVNode("v-if", true),
    vue.renderSlot(_ctx.$slots, "default")
  ], 6)), [
    [vue.vShow, _ctx.data.ready]
  ]);
}
var CarouselItem = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = CarouselItem;
//# sourceMappingURL=item.js.map
