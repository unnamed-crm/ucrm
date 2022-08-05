import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, withDirectives, vModelCheckbox, normalizeStyle, renderSlot, createTextVNode, toDisplayString, createCommentVNode } from 'vue';
import '../../../constants/index.mjs';
import '../../../hooks/index.mjs';
import { useCheckboxProps, useCheckbox, useCheckboxGroup } from './useCheckbox.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElCheckboxButton",
  props: useCheckboxProps,
  emits: [UPDATE_MODEL_EVENT, "change"],
  setup(props) {
    const { focus, isChecked, isDisabled, size, model, handleChange } = useCheckbox(props);
    const { checkboxGroup } = useCheckboxGroup();
    const ns = useNamespace("checkbox");
    const activeStyle = computed(() => {
      var _a, _b, _c, _d;
      const fillValue = (_b = (_a = checkboxGroup == null ? void 0 : checkboxGroup.fill) == null ? void 0 : _a.value) != null ? _b : "";
      return {
        backgroundColor: fillValue,
        borderColor: fillValue,
        color: (_d = (_c = checkboxGroup == null ? void 0 : checkboxGroup.textColor) == null ? void 0 : _c.value) != null ? _d : "",
        boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : null
      };
    });
    return {
      focus,
      isChecked,
      isDisabled,
      model,
      handleChange,
      activeStyle,
      size,
      ns
    };
  }
});
const _hoisted_1 = ["aria-checked", "aria-disabled"];
const _hoisted_2 = ["name", "tabindex", "disabled", "true-value", "false-value"];
const _hoisted_3 = ["name", "tabindex", "disabled", "value"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass([
      _ctx.ns.b("button"),
      _ctx.ns.bm("button", _ctx.size),
      _ctx.ns.is("disabled", _ctx.isDisabled),
      _ctx.ns.is("checked", _ctx.isChecked),
      _ctx.ns.is("focus", _ctx.focus)
    ]),
    role: "checkbox",
    "aria-checked": _ctx.isChecked,
    "aria-disabled": _ctx.isDisabled
  }, [
    _ctx.trueLabel || _ctx.falseLabel ? withDirectives((openBlock(), createElementBlock("input", {
      key: 0,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.model = $event),
      class: normalizeClass(_ctx.ns.be("button", "original")),
      type: "checkbox",
      name: _ctx.name,
      tabindex: _ctx.tabindex,
      disabled: _ctx.isDisabled,
      "true-value": _ctx.trueLabel,
      "false-value": _ctx.falseLabel,
      onChange: _cache[1] || (_cache[1] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
      onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.focus = true),
      onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.focus = false)
    }, null, 42, _hoisted_2)), [
      [vModelCheckbox, _ctx.model]
    ]) : withDirectives((openBlock(), createElementBlock("input", {
      key: 1,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.model = $event),
      class: normalizeClass(_ctx.ns.be("button", "original")),
      type: "checkbox",
      name: _ctx.name,
      tabindex: _ctx.tabindex,
      disabled: _ctx.isDisabled,
      value: _ctx.label,
      onChange: _cache[5] || (_cache[5] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
      onFocus: _cache[6] || (_cache[6] = ($event) => _ctx.focus = true),
      onBlur: _cache[7] || (_cache[7] = ($event) => _ctx.focus = false)
    }, null, 42, _hoisted_3)), [
      [vModelCheckbox, _ctx.model]
    ]),
    _ctx.$slots.default || _ctx.label ? (openBlock(), createElementBlock("span", {
      key: 2,
      class: normalizeClass(_ctx.ns.be("button", "inner")),
      style: normalizeStyle(_ctx.isChecked ? _ctx.activeStyle : null)
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ])
    ], 6)) : createCommentVNode("v-if", true)
  ], 10, _hoisted_1);
}
var CheckboxButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { CheckboxButton as default };
//# sourceMappingURL=checkbox-button.mjs.map
