import { defineComponent, ref, computed, resolveComponent, openBlock, createElementBlock, normalizeClass, createTextVNode, toDisplayString, createVNode } from 'vue';
import '../../../../hooks/index.mjs';
import { ElInput } from '../../../input/index.mjs';
import { usePagination } from '../usePagination.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElPaginationJumper",
  components: {
    ElInput
  },
  setup() {
    const { t } = useLocale();
    const ns = useNamespace("pagination");
    const { pageCount, disabled, currentPage, changeEvent } = usePagination();
    const userInput = ref();
    const innerValue = computed(() => {
      var _a;
      return (_a = userInput.value) != null ? _a : currentPage == null ? void 0 : currentPage.value;
    });
    function handleInput(val) {
      userInput.value = +val;
    }
    function handleChange(val) {
      val = Math.trunc(+val);
      changeEvent == null ? void 0 : changeEvent(+val);
      userInput.value = void 0;
    }
    return {
      ns,
      pageCount,
      disabled,
      innerValue,
      t,
      handleInput,
      handleChange
    };
  }
});
const _hoisted_1 = ["disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  return openBlock(), createElementBlock("span", {
    class: normalizeClass(_ctx.ns.e("jump")),
    disabled: _ctx.disabled
  }, [
    createTextVNode(toDisplayString(_ctx.t("el.pagination.goto")) + " ", 1),
    createVNode(_component_el_input, {
      size: "small",
      class: normalizeClass([_ctx.ns.e("editor"), _ctx.ns.is("in-pagination")]),
      min: 1,
      max: _ctx.pageCount,
      disabled: _ctx.disabled,
      "model-value": _ctx.innerValue,
      type: "number",
      "onUpdate:modelValue": _ctx.handleInput,
      onChange: _ctx.handleChange
    }, null, 8, ["class", "max", "disabled", "model-value", "onUpdate:modelValue", "onChange"]),
    createTextVNode(" " + toDisplayString(_ctx.t("el.pagination.pageClassifier")), 1)
  ], 10, _hoisted_1);
}
var Jumper = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Jumper as default };
//# sourceMappingURL=jumper.mjs.map
