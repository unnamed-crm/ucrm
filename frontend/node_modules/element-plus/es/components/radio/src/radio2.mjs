import { defineComponent, nextTick, openBlock, createElementBlock, normalizeClass, withKeys, withModifiers, createElementVNode, withDirectives, vModelRadio, renderSlot, createTextVNode, toDisplayString } from 'vue';
import '../../../hooks/index.mjs';
import { radioProps, radioEmits, useRadio } from './radio.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElRadio",
  props: radioProps,
  emits: radioEmits,
  setup(props, { emit }) {
    const ns = useNamespace("radio");
    const { radioRef, isGroup, focus, size, disabled, tabIndex, modelValue } = useRadio(props, emit);
    function handleChange() {
      nextTick(() => emit("change", modelValue.value));
    }
    return {
      ns,
      focus,
      isGroup,
      modelValue,
      tabIndex,
      size,
      disabled,
      radioRef,
      handleChange
    };
  }
});
const _hoisted_1 = ["aria-checked", "aria-disabled", "tabindex"];
const _hoisted_2 = ["value", "name", "disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass([
      _ctx.ns.b(),
      _ctx.ns.is("disabled", _ctx.disabled),
      _ctx.ns.is("focus", _ctx.focus),
      _ctx.ns.is("bordered", _ctx.border),
      _ctx.ns.is("checked", _ctx.modelValue === _ctx.label),
      _ctx.ns.m(_ctx.size)
    ]),
    role: "radio",
    "aria-checked": _ctx.modelValue === _ctx.label,
    "aria-disabled": _ctx.disabled,
    tabindex: _ctx.tabIndex,
    onKeydown: _cache[5] || (_cache[5] = withKeys(withModifiers(($event) => _ctx.modelValue = _ctx.disabled ? _ctx.modelValue : _ctx.label, ["stop", "prevent"]), ["space"]))
  }, [
    createElementVNode("span", {
      class: normalizeClass([
        _ctx.ns.e("input"),
        _ctx.ns.is("disabled", _ctx.disabled),
        _ctx.ns.is("checked", _ctx.modelValue === _ctx.label)
      ])
    }, [
      createElementVNode("span", {
        class: normalizeClass(_ctx.ns.e("inner"))
      }, null, 2),
      withDirectives(createElementVNode("input", {
        ref: "radioRef",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.modelValue = $event),
        class: normalizeClass(_ctx.ns.e("original")),
        value: _ctx.label,
        type: "radio",
        "aria-hidden": "true",
        name: _ctx.name,
        disabled: _ctx.disabled,
        tabindex: "-1",
        onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.focus = true),
        onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.focus = false),
        onChange: _cache[3] || (_cache[3] = (...args) => _ctx.handleChange && _ctx.handleChange(...args))
      }, null, 42, _hoisted_2), [
        [vModelRadio, _ctx.modelValue]
      ])
    ], 2),
    createElementVNode("span", {
      class: normalizeClass(_ctx.ns.e("label")),
      onKeydown: _cache[4] || (_cache[4] = withModifiers(() => {
      }, ["stop"]))
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ])
    ], 34)
  ], 42, _hoisted_1);
}
var Radio = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Radio as default };
//# sourceMappingURL=radio2.mjs.map
