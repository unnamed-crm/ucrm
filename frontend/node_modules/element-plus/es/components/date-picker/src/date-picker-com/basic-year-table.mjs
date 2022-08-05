import { defineComponent, computed, createElementVNode, openBlock, createElementBlock, normalizeClass, toDisplayString } from 'vue';
import dayjs from 'dayjs';
import '../../../../hooks/index.mjs';
import '../../../time-picker/index.mjs';
import '../../../../utils/index.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import { rangeArr } from '../../../time-picker/src/common/date-utils.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { castArray } from '../../../../utils/arrays.mjs';
import { hasClass } from '../../../../utils/dom/style.mjs';

const datesInYear = (year, lang) => {
  const firstDay = dayjs(String(year)).locale(lang).startOf("year");
  const lastDay = firstDay.endOf("year");
  const numOfDays = lastDay.dayOfYear();
  return rangeArr(numOfDays).map((n) => firstDay.add(n, "day").toDate());
};
const _sfc_main = defineComponent({
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
    const { lang } = useLocale();
    const startYear = computed(() => {
      return Math.floor(props.date.year() / 10) * 10;
    });
    const getCellStyle = (year) => {
      const style = {};
      const today = dayjs().locale(lang.value);
      style.disabled = props.disabledDate ? datesInYear(year, lang.value).every(props.disabledDate) : false;
      style.current = castArray(props.parsedValue).findIndex((_) => _.year() === year) >= 0;
      style.today = today.year() === year;
      return style;
    };
    const handleYearTableClick = (event) => {
      const target = event.target;
      if (target.tagName === "A") {
        if (hasClass(target.parentNode, "disabled"))
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
const _hoisted_11 = /* @__PURE__ */ createElementVNode("td", null, null, -1);
const _hoisted_12 = /* @__PURE__ */ createElementVNode("td", null, null, -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("table", {
    class: "el-year-table",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleYearTableClick && _ctx.handleYearTableClick(...args))
  }, [
    createElementVNode("tbody", null, [
      createElementVNode("tr", null, [
        createElementVNode("td", {
          class: normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 0)])
        }, [
          createElementVNode("a", _hoisted_1, toDisplayString(_ctx.startYear), 1)
        ], 2),
        createElementVNode("td", {
          class: normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 1)])
        }, [
          createElementVNode("a", _hoisted_2, toDisplayString(_ctx.startYear + 1), 1)
        ], 2),
        createElementVNode("td", {
          class: normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 2)])
        }, [
          createElementVNode("a", _hoisted_3, toDisplayString(_ctx.startYear + 2), 1)
        ], 2),
        createElementVNode("td", {
          class: normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 3)])
        }, [
          createElementVNode("a", _hoisted_4, toDisplayString(_ctx.startYear + 3), 1)
        ], 2)
      ]),
      createElementVNode("tr", null, [
        createElementVNode("td", {
          class: normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 4)])
        }, [
          createElementVNode("a", _hoisted_5, toDisplayString(_ctx.startYear + 4), 1)
        ], 2),
        createElementVNode("td", {
          class: normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 5)])
        }, [
          createElementVNode("a", _hoisted_6, toDisplayString(_ctx.startYear + 5), 1)
        ], 2),
        createElementVNode("td", {
          class: normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 6)])
        }, [
          createElementVNode("a", _hoisted_7, toDisplayString(_ctx.startYear + 6), 1)
        ], 2),
        createElementVNode("td", {
          class: normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 7)])
        }, [
          createElementVNode("a", _hoisted_8, toDisplayString(_ctx.startYear + 7), 1)
        ], 2)
      ]),
      createElementVNode("tr", null, [
        createElementVNode("td", {
          class: normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 8)])
        }, [
          createElementVNode("a", _hoisted_9, toDisplayString(_ctx.startYear + 8), 1)
        ], 2),
        createElementVNode("td", {
          class: normalizeClass(["available", _ctx.getCellStyle(_ctx.startYear + 9)])
        }, [
          createElementVNode("a", _hoisted_10, toDisplayString(_ctx.startYear + 9), 1)
        ], 2),
        _hoisted_11,
        _hoisted_12
      ])
    ])
  ]);
}
var YearTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { YearTable as default };
//# sourceMappingURL=basic-year-table.mjs.map
