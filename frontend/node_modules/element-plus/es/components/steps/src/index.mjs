import { defineComponent, ref, watch, provide, openBlock, createElementBlock, normalizeClass, renderSlot } from 'vue';
import '../../../constants/index.mjs';
import '../../../hooks/index.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { CHANGE_EVENT } from '../../../constants/event.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElSteps",
  props: {
    space: {
      type: [Number, String],
      default: ""
    },
    active: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: "horizontal",
      validator: (val) => ["horizontal", "vertical"].includes(val)
    },
    alignCenter: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    finishStatus: {
      type: String,
      default: "finish",
      validator: (val) => ["wait", "process", "finish", "error", "success"].includes(val)
    },
    processStatus: {
      type: String,
      default: "process",
      validator: (val) => ["wait", "process", "finish", "error", "success"].includes(val)
    }
  },
  emits: [CHANGE_EVENT],
  setup(props, { emit }) {
    const ns = useNamespace("steps");
    const steps = ref([]);
    watch(steps, () => {
      steps.value.forEach((instance, index) => {
        instance.setIndex(index);
      });
    });
    provide("ElSteps", { props, steps });
    watch(() => props.active, (newVal, oldVal) => {
      emit(CHANGE_EVENT, newVal, oldVal);
    });
    return {
      steps,
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.ns.b(), _ctx.ns.m(_ctx.simple ? "simple" : _ctx.direction)])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var Steps = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Steps as default };
//# sourceMappingURL=index.mjs.map
