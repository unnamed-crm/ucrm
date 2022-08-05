'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../constants/index.js');
require('../../../hooks/index.js');
var useCheckbox = require('./useCheckbox.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var event = require('../../../constants/event.js');
var index = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElCheckboxButton",
  props: useCheckbox.useCheckboxProps,
  emits: [event.UPDATE_MODEL_EVENT, "change"],
  setup(props) {
    const { focus, isChecked, isDisabled, size, model, handleChange } = useCheckbox.useCheckbox(props);
    const { checkboxGroup } = useCheckbox.useCheckboxGroup();
    const ns = index.useNamespace("checkbox");
    const activeStyle = vue.computed(() => {
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
  return vue.openBlock(), vue.createElementBlock("label", {
    class: vue.normalizeClass([
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
    _ctx.trueLabel || _ctx.falseLabel ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
      key: 0,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.model = $event),
      class: vue.normalizeClass(_ctx.ns.be("button", "original")),
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
      [vue.vModelCheckbox, _ctx.model]
    ]) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
      key: 1,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.model = $event),
      class: vue.normalizeClass(_ctx.ns.be("button", "original")),
      type: "checkbox",
      name: _ctx.name,
      tabindex: _ctx.tabindex,
      disabled: _ctx.isDisabled,
      value: _ctx.label,
      onChange: _cache[5] || (_cache[5] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
      onFocus: _cache[6] || (_cache[6] = ($event) => _ctx.focus = true),
      onBlur: _cache[7] || (_cache[7] = ($event) => _ctx.focus = false)
    }, null, 42, _hoisted_3)), [
      [vue.vModelCheckbox, _ctx.model]
    ]),
    _ctx.$slots.default || _ctx.label ? (vue.openBlock(), vue.createElementBlock("span", {
      key: 2,
      class: vue.normalizeClass(_ctx.ns.be("button", "inner")),
      style: vue.normalizeStyle(_ctx.isChecked ? _ctx.activeStyle : null)
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
      ])
    ], 6)) : vue.createCommentVNode("v-if", true)
  ], 10, _hoisted_1);
}
var CheckboxButton = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = CheckboxButton;
//# sourceMappingURL=checkbox-button.js.map
