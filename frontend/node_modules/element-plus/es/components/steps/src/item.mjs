import { defineComponent, ref, inject, getCurrentInstance, onMounted, watch, onBeforeUnmount, computed, reactive, resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, createCommentVNode, createElementVNode, renderSlot, createBlock, withCtx, resolveDynamicComponent, toDisplayString, createTextVNode } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { Close, Check } from '@element-plus/icons-vue';
import '../../../hooks/index.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElStep",
  components: {
    ElIcon,
    Close,
    Check
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: [String, Object],
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "",
      validator: (val) => ["", "wait", "process", "finish", "error", "success"].includes(val)
    }
  },
  setup(props) {
    const ns = useNamespace("step");
    const index = ref(-1);
    const lineStyle = ref({});
    const internalStatus = ref("");
    const parent = inject("ElSteps");
    const currentInstance = getCurrentInstance();
    onMounted(() => {
      watch([
        () => parent.props.active,
        () => parent.props.processStatus,
        () => parent.props.finishStatus
      ], ([active]) => {
        updateStatus(active);
      }, { immediate: true });
    });
    onBeforeUnmount(() => {
      parent.steps.value = parent.steps.value.filter((instance) => instance.uid !== currentInstance.uid);
    });
    const currentStatus = computed(() => {
      return props.status || internalStatus.value;
    });
    const prevStatus = computed(() => {
      const prevStep = parent.steps.value[index.value - 1];
      return prevStep ? prevStep.currentStatus : "wait";
    });
    const isCenter = computed(() => {
      return parent.props.alignCenter;
    });
    const isVertical = computed(() => {
      return parent.props.direction === "vertical";
    });
    const isSimple = computed(() => {
      return parent.props.simple;
    });
    const stepsCount = computed(() => {
      return parent.steps.value.length;
    });
    const isLast = computed(() => {
      var _a;
      return ((_a = parent.steps.value[stepsCount.value - 1]) == null ? void 0 : _a.uid) === currentInstance.uid;
    });
    const space = computed(() => {
      return isSimple.value ? "" : parent.props.space;
    });
    const style = computed(() => {
      const style2 = {
        flexBasis: typeof space.value === "number" ? `${space.value}px` : space.value ? space.value : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%`
      };
      if (isVertical.value)
        return style2;
      if (isLast.value) {
        style2.maxWidth = `${100 / stepsCount.value}%`;
      }
      return style2;
    });
    const setIndex = (val) => {
      index.value = val;
    };
    const calcProgress = (status) => {
      let step = 100;
      const style2 = {};
      style2.transitionDelay = `${150 * index.value}ms`;
      if (status === parent.props.processStatus) {
        step = 0;
      } else if (status === "wait") {
        step = 0;
        style2.transitionDelay = `${-150 * index.value}ms`;
      }
      style2.borderWidth = step && !isSimple.value ? "1px" : 0;
      style2[parent.props.direction === "vertical" ? "height" : "width"] = `${step}%`;
      lineStyle.value = style2;
    };
    const updateStatus = (activeIndex) => {
      if (activeIndex > index.value) {
        internalStatus.value = parent.props.finishStatus;
      } else if (activeIndex === index.value && prevStatus.value !== "error") {
        internalStatus.value = parent.props.processStatus;
      } else {
        internalStatus.value = "wait";
      }
      const prevChild = parent.steps.value[stepsCount.value - 1];
      if (prevChild)
        prevChild.calcProgress(internalStatus.value);
    };
    const stepItemState = reactive({
      uid: computed(() => currentInstance.uid),
      currentStatus,
      setIndex,
      calcProgress
    });
    parent.steps.value = [...parent.steps.value, stepItemState];
    return {
      ns,
      index,
      lineStyle,
      currentStatus,
      isCenter,
      isVertical,
      isSimple,
      isLast,
      space,
      style,
      parent,
      setIndex,
      calcProgress,
      updateStatus
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_check = resolveComponent("check");
  const _component_close = resolveComponent("close");
  return openBlock(), createElementBlock("div", {
    style: normalizeStyle(_ctx.style),
    class: normalizeClass([
      _ctx.ns.b(),
      _ctx.ns.is(_ctx.isSimple ? "simple" : _ctx.parent.props.direction),
      _ctx.ns.is("flex", _ctx.isLast && !_ctx.space && !_ctx.isCenter),
      _ctx.ns.is("center", _ctx.isCenter && !_ctx.isVertical && !_ctx.isSimple)
    ])
  }, [
    createCommentVNode(" icon & line "),
    createElementVNode("div", {
      class: normalizeClass([_ctx.ns.e("head"), _ctx.ns.is(_ctx.currentStatus)])
    }, [
      !_ctx.isSimple ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.ns.e("line"))
      }, [
        createElementVNode("i", {
          class: normalizeClass(_ctx.ns.e("line-inner")),
          style: normalizeStyle(_ctx.lineStyle)
        }, null, 6)
      ], 2)) : createCommentVNode("v-if", true),
      createElementVNode("div", {
        class: normalizeClass([_ctx.ns.e("icon"), _ctx.ns.is(_ctx.icon ? "icon" : "text")])
      }, [
        _ctx.currentStatus !== "success" && _ctx.currentStatus !== "error" ? renderSlot(_ctx.$slots, "icon", { key: 0 }, () => [
          _ctx.icon ? (openBlock(), createBlock(_component_el_icon, {
            key: 0,
            class: normalizeClass(_ctx.ns.e("icon-inner"))
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", true),
          !_ctx.icon && !_ctx.isSimple ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(_ctx.ns.e("icon-inner"))
          }, toDisplayString(_ctx.index + 1), 3)) : createCommentVNode("v-if", true)
        ]) : (openBlock(), createBlock(_component_el_icon, {
          key: 1,
          class: normalizeClass([_ctx.ns.e("icon-inner"), _ctx.ns.is("status")])
        }, {
          default: withCtx(() => [
            _ctx.currentStatus === "success" ? (openBlock(), createBlock(_component_check, { key: 0 })) : (openBlock(), createBlock(_component_close, { key: 1 }))
          ]),
          _: 1
        }, 8, ["class"]))
      ], 2)
    ], 2),
    createCommentVNode(" title & description "),
    createElementVNode("div", {
      class: normalizeClass(_ctx.ns.e("main"))
    }, [
      createElementVNode("div", {
        class: normalizeClass([_ctx.ns.e("title"), _ctx.ns.is(_ctx.currentStatus)])
      }, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(_ctx.title), 1)
        ])
      ], 2),
      _ctx.isSimple ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.ns.e("arrow"))
      }, null, 2)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass([_ctx.ns.e("description"), _ctx.ns.is(_ctx.currentStatus)])
      }, [
        renderSlot(_ctx.$slots, "description", {}, () => [
          createTextVNode(toDisplayString(_ctx.description), 1)
        ])
      ], 2))
    ], 2)
  ], 6);
}
var Step = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Step as default };
//# sourceMappingURL=item.mjs.map
