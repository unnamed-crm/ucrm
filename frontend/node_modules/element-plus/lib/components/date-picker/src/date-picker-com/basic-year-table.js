'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
require('../../../../hooks/index.js');
require('../../../time-picker/index.js');
require('../../../../utils/index.js');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');
var dateUtils = require('../../../time-picker/src/common/date-utils.js');
var index = require('../../../../hooks/use-locale/index.js');
var arrays = require('../../../../utils/arrays.js');
var style = require('../../../../utils/dom/style.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

const datesInYear = (year, lang) => {
  const firstDay = dayjs__default["default"](String(year)).locale(lang).startOf("year");
  const lastDay = firstDay.endOf("year");
  const numOfDays = lastDay.dayOfYear();
  return dateUtils.rangeArr(numOfDays).map((n) => firstDay.add(n, "day").toDate());
};
const _sfc_main = vue.defineComponent({
  props: {
    disabledDate: {
      type: Function
    },
    parsedValue: {
      type: Object
    },
    date: {
      type: Object
    }
  },
  emits: ["pick"],
  setup(props, ctx) {
    const { lang } = index.useLocale();
    const startYear = vue.computed(() => {
      return Math.floor(props.date.year() / 10) * 10;
    });
    const getCellStyle = (year) => {
      const style = {};
      const today = dayjs__default["default"]().locale(lang.value);
      style.disabled = props.disabledDate ? datesInYear(year, lang.value).every(props.disabledDate) : false;
      style.current = arrays.castArray(props.parsedValue).findIndex((_) => _.year() === year) >= 0;
      style.today = today.year() === year;
      return style;
    };
    const handleYearTableClick = (event) => {
      const target = event.target;
      if (target.tagName === "A") {
        if (style.hasClass(target.parentNode, "disabled"))
          return;
        const year = target.textContent || target.innerText;
        ctx.emit("pick", Number(year));
      }
    };
    return {
      startYear,
      getCellStyle,
      handleYearTableClick
    };
  }
});
const _hoisted_1 = { class: "cell" };
const _hoisted_2 = { class: "cell" };
const _hoisted_3 = { class: "cell" };
const _hoisted_4 = { class: "cell" };
const _hoisted_5 = { class: "cell" };
const _hoisted_6 = { class: "cell" };
const _hoisted_7 = { class: "cell" };
const _hoisted_8 = { class: "cell" };
const _hoisted_9 = { class: "cell" };
const _hoisted_10 = { class: "cell" };
const _hoisted_11 = /* @__PURE__ */ vue.createElementVNode("td", null, null, -1);
const _hoisted_12 = /* @__PURE__ */ vue.createElementVNode("td", null, null, -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("table", {
    class: "el-year-table",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleYearTableClick && _ctx.handleYearTableClick(...args))
  }, [
    vue.createElementVNode("tbody", null, [
      vue.createElementVNode("tr", null, [
        vue.createElementVNode("td", {
          class: vue.normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 0)])
        }, [
          vue.createElementVNode("a", _hoisted_1, vue.toDisplayString(_ctx.startYear), 1)
        ], 2),
        vue.createElementVNode("td", {
          class: vue.normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 1)])
        }, [
          vue.createElementVNode("a", _hoisted_2, vue.toDisplayString(_ctx.startYear + 1), 1)
        ], 2),
        vue.createElementVNode("td", {
          class: vue.normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 2)])
        }, [
          vue.createElementVNode("a", _hoisted_3, vue.toDisplayString(_ctx.startYear + 2), 1)
        ], 2),
        vue.createElementVNode("td", {
          class: vue.normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 3)])
        }, [
          vue.createElementVNode("a", _hoisted_4, vue.toDisplayString(_ctx.startYear + 3), 1)
        ], 2)
      ]),
      vue.createElementVNode("tr", null, [
        vue.createElementVNode("td", {
          class: vue.normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 4)])
        }, [
          vue.createElementVNode("a", _hoisted_5, vue.toDisplayString(_ctx.startYear + 4), 1)
        ], 2),
        vue.createElementVNode("td", {
          class: vue.normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 5)])
        }, [
          vue.createElementVNode("a", _hoisted_6, vue.toDisplayString(_ctx.startYear + 5), 1)
        ], 2),
        vue.createElementVNode("td", {
          class: vue.normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 6)])
        }, [
          vue.createElementVNode("a", _hoisted_7, vue.toDisplayString(_ctx.startYear + 6), 1)
        ], 2),
        vue.createElementVNode("td", {
          class: vue.normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 7)])
        }, [
          vue.createElementVNode("a", _hoisted_8, vue.toDisplayString(_ctx.startYear + 7), 1)
        ], 2)
      ]),
      vue.createElementVNode("tr", null, [
        vue.createElementVNode("td", {
          class: vue.normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 8)])
        }, [
          vue.createElementVNode("a", _hoisted_9, vue.toDisplayString(_ctx.startYear + 8), 1)
        ], 2),
        vue.createElementVNode("td", {
          class: vue.normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 9)])
        }, [
          vue.createElementVNode("a", _hoisted_10, vue.toDisplayString(_ctx.startYear + 9), 1)
        ], 2),
        _hoisted_11,
        _hoisted_12
      ])
    ])
  ]);
}
var YearTable = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = YearTable;
//# sourceMappingURL=basic-year-table.js.map
