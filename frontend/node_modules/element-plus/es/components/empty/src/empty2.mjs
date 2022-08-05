import { defineComponent, computed, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, renderSlot, createVNode, toDisplayString, createCommentVNode } from 'vue';
import '../../../hooks/index.mjs';
import ImgEmpty from './img-empty.mjs';
import { emptyProps } from './empty.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElEmpty",
  components: {
    ImgEmpty
  },
  props: emptyProps,
  setup(props) {
    const { t } = useLocale();
    const ns = useNamespace("empty");
    const emptyDescription = computed(() => props.description || t("el.table.emptyText"));
    const imageStyle = computed(() => ({
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
  const _component_img_empty = resolveComponent("img-empty");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.ns.b())
  }, [
    createElementVNode("div", {
      class: normalizeClass(_ctx.ns.e("image")),
      style: normalizeStyle(_ctx.imageStyle)
    }, [
      _ctx.image ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: _ctx.image,
        ondragstart: "return false"
      }, null, 8, _hoisted_1)) : renderSlot(_ctx.$slots, "image", { key: 1 }, () => [
        createVNode(_component_img_empty)
      ])
    ], 6),
    createElementVNode("div", {
      class: normalizeClass(_ctx.ns.e("description"))
    }, [
      _ctx.$slots.description ? renderSlot(_ctx.$slots, "description", { key: 0 }) : (openBlock(), createElementBlock("p", _hoisted_2, toDisplayString(_ctx.emptyDescription), 1))
    ], 2),
    _ctx.$slots.default ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.ns.e("bottom"))
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)) : createCommentVNode("v-if", true)
  ], 2);
}
var Empty = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Empty as default };
//# sourceMappingURL=empty2.mjs.map
