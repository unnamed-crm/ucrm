import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, withKeys, withModifiers, withDirectives, createElementVNode, vModelRadio, normalizeStyle, renderSlot, createTextVNode, toDisplayString } from 'vue';
import '../../../hooks/index.mjs';
import { useRadio } from './radio.mjs';
import { radioButtonProps } from './radio-button.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElRadioButton",
  props: radioButtonProps,
  setup(props, { emit }) {
    const ns = useNamespace("radio");
    const {
      radioRef,
      isGroup,
      focus,
      size,
      disabled,
      tabIndex,
      modelValue,
      radioGroup
    } = useRadio(props, emit);
    const activeStyle = computed(() => {
      return {
        backgroundColor: (radioGroup == null ? void 0 : radioGroup.fill) || "",
        borderColor: (radioGroup == null ? void 0 : radioGroup.fill) || "",
        boxShadow: (radioGroup == null ? void 0 : radioGroup.fill) ? `-1px 0 0 0 ${radioGroup.fill}` : "",
        color: (radioGroup == null ? void 0 : radioGroup.textColor) || ""
      };
    });
    return {
      ns,
      isGroup,
      size,
      disabled,
      tabIndex,
      modelValue,
      focus,
      activeStyle,
      radioRef
    };
  }
});
const _hoisted_1 = ["aria-checked", "aria-disabled", "tabindex"];
const _hoisted_2 = ["value", "name", "disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass([
      _ctx.ns.b("button"),
      _ctx.ns.is("active", _ctx.modelValue === _ctx.label),
      _ctx.ns.is("disabled", _ctx.disabled),
      _ctx.ns.is("focus", _ctx.focus),
      _ctx.ns.bm("button", _ctx.size)
    ]),
    role: "radio",
    "aria-checked": _ctx.modelValue === _ctx.label,
    "aria-disabled": _ctx.disabled,
    tabindex: _ctx.tabIndex,
    onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => _ctx.modelValue = _ctx.disabled ? _ctx.modelValue : _ctx.label, ["stop", "prevent"]), ["space"]))
  }, [
    withDirectives(createElementVNode("input", {
      ref: "radioRef",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.modelValue = $event),
      class: normalizeClass(_ctx.ns.be("button", "original-radio")),
      value: _ctx.label,
      type: "radio",
      name: _ctx.name,
      disabled: _ctx.disabled,
      tabindex: "-1",
      onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.focus = true),
      onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.focus = false)
    }, null, 42, _hoisted_2), [
      [vModelRadio, _ctx.modelValue]
    ]),
    createElementVNode("span", {
      class: normalizeClass(_ctx.ns.be("button", "inner")),
      style: normalizeStyle(_ctx.modelValue === _ctx.label ? _ctx.activeStyle : {}),
      onKeydown: _cache[3] || (_cache[3] = withModifiers(() => {
      }, ["stop"]))
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ])
    ], 38)
  ], 42, _hoisted_1);
}
var RadioButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { RadioButton as default };
//# sourceMappingURL=radio-button2.mjs.map
