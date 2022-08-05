import { defineComponent, computed, openBlock, createElementBlock, mergeProps } from 'vue';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';

const _sfc_main = defineComponent({
  name: "ElVisuallyHidden",
  props: {
    style: {
      type: [String, Object, Array]
    }
  },
  setup(props) {
    return {
      computedStyle: computed(() => {
        return [
          props.style,
          {
            position: "absolute",
            border: 0,
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            wordWrap: "normal"
          }
        ];
      })
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps(_ctx.$attrs, { style: _ctx.computedStyle }), null, 16);
}
var ElVisuallyHidden = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { ElVisuallyHidden as default };
//# sourceMappingURL=visual-hidden.mjs.map
