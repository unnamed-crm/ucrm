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

const datesInMonth = (year, month, lang) => {
  const firstDay = dayjs__default["default"]().locale(lang).startOf("month").month(month).year(year);
  const numOfDays = firstDay.daysInMonth();
  return dateUtils.rangeArr(numOfDays).map((n) => firstDay.add(n, "day").toDate());
};
const _sfc_main = vue.defineComponent({
  props: {
    disabledDate: {
      type: Function
    },
    selectionMode: {
      type: String,
      default: "month"
    },
    minDate: {
      type: Object
    },
    maxDate: {
      type: Object
    },
    date: {
      type: Object
    },
    parsedValue: {
      type: Object
    },
    rangeState: {
      type: Object,
      default: () => ({
        endDate: null,
        selecting: false
      })
    }
  },
  emits: ["changerange", "pick", "select"],
  setup(props, ctx) {
    const { t, lang } = index.useLocale();
    const months = vue.ref(props.date.locale("en").localeData().monthsShort().map((_) => _.toLowerCase()));
    const tableRows = vue.ref([[], [], []]);
    const lastRow = vue.ref(null);
    const lastColumn = vue.ref(null);
    const rows = vue.computed(() => {
      var _a;
      const rows2 = tableRows.value;
      const now = dayjs__default["default"]().locale(lang.value).startOf("month");
      for (let i = 0; i < 3; i++) {
        const row = rows2[i];
        for (let j = 0; j < 4; j++) {
          let cell = row[j];
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: "normal",
              inRange: false,
              start: false,
              end: false
            };
          }
          cell.type = "normal";
          const index = i * 4 + j;
          const calTime = props.date.startOf("year").month(index);
          const calEndDate = props.rangeState.endDate || props.maxDate || props.rangeState.selecting && props.minDate;
          cell.inRange = props.minDate && calTime.isSameOrAfter(props.minDate, "month") && calEndDate && calTime.isSameOrBefore(calEndDate, "month") || props.minDate && calTime.isSameOrBefore(props.minDate, "month") && calEndDate && calTime.isSameOrAfter(calEndDate, "month");
          if ((_a = props.minDate) == null ? void 0 : _a.isSameOrAfter(calEndDate)) {
            cell.start = calEndDate && calTime.isSame(calEndDate, "month");
            cell.end = props.minDate && calTime.isSame(props.minDate, "month");
          } else {
            cell.start = props.minDate && calTime.isSame(props.minDate, "month");
            cell.end = calEndDate && calTime.isSame(calEndDate, "month");
          }
          const isToday = now.isSame(calTime);
          if (isToday) {
            cell.type = "today";
          }
          cell.text = index;
          const cellDate = calTime.toDate();
          cell.disabled = props.disabledDate && props.disabledDate(cellDate);
          row[j] = cell;
        }
      }
      return rows2;
    });
    const getCellStyle = (cell) => {
      const style = {};
      const year = props.date.year();
      const today = new Date();
      const month = cell.text;
      style.disabled = props.disabledDate ? datesInMonth(year, month, lang.value).every(props.disabledDate) : false;
      style.current = arrays.castArray(props.parsedValue).findIndex((date) => date.year() === year && date.month() === month) >= 0;
      style.today = today.getFullYear() === year && today.getMonth() === month;
      if (cell.inRange) {
        style["in-range"] = true;
        if (cell.start) {
          style["start-date"] = true;
        }
        if (cell.end) {
          style["end-date"] = true;
        }
      }
      return style;
    };
    const handleMouseMove = (event) => {
      if (!props.rangeState.selecting)
        return;
      let target = event.target;
      if (target.tagName === "A") {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === "DIV") {
        target = target.parentNode;
      }
      if (target.tagName !== "TD")
        return;
      const row = target.parentNode.rowIndex;
      const column = target.cellIndex;
      if (rows.value[row][column].disabled)
        return;
      if (row !== lastRow.value || column !== lastColumn.value) {
        lastRow.value = row;
        lastColumn.value = column;
        ctx.emit("changerange", {
          selecting: true,
          endDate: props.date.startOf("year").month(row * 4 + column)
        });
      }
    };
    const handleMonthTableClick = (event) => {
      let target = event.target;
      if (target.tagName === "A") {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === "DIV") {
        target = target.parentNode;
      }
      if (target.tagName !== "TD")
        return;
      if (style.hasClass(target, "disabled"))
        return;
      const column = target.cellIndex;
      const row = target.parentNode.rowIndex;
      const month = row * 4 + column;
      const newDate = props.date.startOf("year").month(month);
      if (props.selectionMode === "range") {
        if (!props.rangeState.selecting) {
          ctx.emit("pick", { minDate: newDate, maxDate: null });
          ctx.emit("select", true);
        } else {
          if (newDate >= props.minDate) {
            ctx.emit("pick", { minDate: props.minDate, maxDate: newDate });
          } else {
            ctx.emit("pick", { minDate: newDate, maxDate: props.minDate });
          }
          ctx.emit("select", false);
        }
      } else {
        ctx.emit("pick", month);
      }
    };
    return {
      handleMouseMove,
      handleMonthTableClick,
      rows,
      getCellStyle,
      t,
      months
    };
  }
});
const _hoisted_1 = { class: "cell" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("table", {
    class: "el-month-table",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleMonthTableClick && _ctx.handleMonthTableClick(...args)),
    onMousemove: _cache[1] || (_cache[1] = (...args) => _ctx.handleMouseMove && _ctx.handleMouseMove(...args))
  }, [
    vue.createElementVNode("tbody", null, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.rows, (row, key) => {
        return vue.openBlock(), vue.createElementBlock("tr", { key }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(row, (cell, key_) => {
            return vue.openBlock(), vue.createElementBlock("td", {
              key: key_,
              class: vue.normalizeClass(_ctx.getCellStyle(cell))
            }, [
              vue.createElementVNode("div", null, [
                vue.createElementVNode("a", _hoisted_1, vue.toDisplayString(_ctx.t("el.datepicker.months." + _ctx.months[cell.text])), 1)
              ])
            ], 2);
          }), 128))
        ]);
      }), 128))
    ])
  ], 32);
}
var MonthTable = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = MonthTable;
//# sourceMappingURL=basic-month-table.js.map
