'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../hooks/index.js');
var radio = require('./radio.js');
var radioButton = require('./radio-button.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElRadioButton",
  props: radioButton.radioButtonProps,
  setup(props, { emit }) {
    const ns = index.useNamespace("radio");
    const {
      radioRef,
      isGroup,
      focus,
      size,
      disabled,
      tabIndex,
      modelValue,
      radioGroup
    } = radio.useRadio(props, emit);
    const activeStyle = vue.computed(() => {
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
  return vue.openBlock(), vue.createElementBlock("label", {
    class: vue.normalizeClass([
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
    onKeydown: _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers(($event) => _ctx.modelValue = _ctx.disabled ? _ctx.modelValue : _ctx.label, ["stop", "prevent"]), ["space"]))
  }, [
    vue.withDirectives(vue.createElementVNode("input", {
      ref: "radioRef",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.modelValue = $event),
      class: vue.normalizeClass(_ctx.ns.be("button", "original-radio")),
      value: _ctx.label,
      type: "radio",
      name: _ctx.name,
      disabled: _ctx.disabled,
      tabindex: "-1",
      onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.focus = true),
      onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.focus = false)
    }, null, 42, _hoisted_2), [
      [vue.vModelRadio, _ctx.modelValue]
    ]),
    vue.createElementVNode("span", {
      class: vue.normalizeClass(_ctx.ns.be("button", "inner")),
      style: vue.normalizeStyle(_ctx.modelValue === _ctx.label ? _ctx.activeStyle : {}),
      onKeydown: _cache[3] || (_cache[3] = vue.withModifiers(() => {
      }, ["stop"]))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
      ])
    ], 38)
  ], 42, _hoisted_1);
}
var RadioButton = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = RadioButton;
//# sourceMappingURL=radio-button2.js.map
