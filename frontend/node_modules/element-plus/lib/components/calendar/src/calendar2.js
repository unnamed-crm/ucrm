'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var index = require('../../button/index.js');
require('../../../hooks/index.js');
require('../../../utils/index.js');
var dateTable = require('./date-table2.js');
var calendar = require('./calendar.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var index$2 = require('../../../hooks/use-locale/index.js');
var error = require('../../../utils/error.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

const _sfc_main = vue.defineComponent({
  name: "ElCalendar",
  components: {
    DateTable: dateTable["default"],
    ElButton: index.ElButton,
    ElButtonGroup: index.ElButtonGroup
  },
  props: calendar.calendarProps,
  emits: calendar.calendarEmits,
  setup(props, { emit }) {
    const ns = index$1.useNamespace("calendar");
    const { t, lang } = index$2.useLocale();
    const selectedDay = vue.ref();
    const now = dayjs__default["default"]().locale(lang.value);
    const prevMonthDayjs = vue.computed(() => {
      return date.value.subtract(1, "month").date(1);
    });
    const curMonthDatePrefix = vue.computed(() => {
      return dayjs__default["default"](date.value).locale(lang.value).format("YYYY-MM");
    });
    const nextMonthDayjs = vue.computed(() => {
      return date.value.add(1, "month").date(1);
    });
    const prevYearDayjs = vue.computed(() => {
      return date.value.subtract(1, "year").date(1);
    });
    const nextYearDayjs = vue.computed(() => {
      return date.value.add(1, "year").date(1);
    });
    const i18nDate = vue.computed(() => {
      const pickedMonth = `el.datepicker.month${date.value.format("M")}`;
      return `${date.value.year()} ${t("el.datepicker.year")} ${t(pickedMonth)}`;
    });
    const realSelectedDay = vue.computed({
      get() {
        if (!props.modelValue)
          return selectedDay.value;
        return date.value;
      },
      set(val) {
        if (!val)
          return;
        selectedDay.value = val;
        const result = val.toDate();
        emit("input", result);
        emit("update:modelValue", result);
      }
    });
    const date = vue.computed(() => {
      if (!props.modelValue) {
        if (realSelectedDay.value) {
          return realSelectedDay.value;
        } else if (validatedRange.value.length) {
          return validatedRange.value[0][0];
        }
        return now;
      } else {
        return dayjs__default["default"](props.modelValue).locale(lang.value);
      }
    });
    const calculateValidatedDateRange = (startDayjs, endDayjs) => {
      const firstDay = startDayjs.startOf("week");
      const lastDay = endDayjs.endOf("week");
      const firstMonth = firstDay.get("month");
      const lastMonth = lastDay.get("month");
      if (firstMonth === lastMonth) {
        return [[firstDay, lastDay]];
      } else if (firstMonth + 1 === lastMonth) {
        const firstMonthLastDay = firstDay.endOf("month");
        const lastMonthFirstDay = lastDay.startOf("month");
        const isSameWeek = firstMonthLastDay.isSame(lastMonthFirstDay, "week");
        const lastMonthStartDay = isSameWeek ? lastMonthFirstDay.add(1, "week") : lastMonthFirstDay;
        return [
          [firstDay, firstMonthLastDay],
          [lastMonthStartDay.startOf("week"), lastDay]
        ];
      } else if (firstMonth + 2 === lastMonth) {
        const firstMonthLastDay = firstDay.endOf("month");
        const secondMonthFirstDay = firstDay.add(1, "month").startOf("month");
        const secondMonthStartDay = firstMonthLastDay.isSame(secondMonthFirstDay, "week") ? secondMonthFirstDay.add(1, "week") : secondMonthFirstDay;
        const secondMonthLastDay = secondMonthStartDay.endOf("month");
        const lastMonthFirstDay = lastDay.startOf("month");
        const lastMonthStartDay = secondMonthLastDay.isSame(lastMonthFirstDay, "week") ? lastMonthFirstDay.add(1, "week") : lastMonthFirstDay;
        return [
          [firstDay, firstMonthLastDay],
          [secondMonthStartDay.startOf("week"), secondMonthLastDay],
          [lastMonthStartDay.startOf("week"), lastDay]
        ];
      } else {
        error.debugWarn("ElCalendar", "start time and end time interval must not exceed two months");
        return [];
      }
    };
    const validatedRange = vue.computed(() => {
      if (!props.range)
        return [];
      const rangeArrDayjs = props.range.map((_) => dayjs__default["default"](_).locale(lang.value));
      const [startDayjs, endDayjs] = rangeArrDayjs;
      if (startDayjs.isAfter(endDayjs)) {
        error.debugWarn("ElCalendar", "end time should be greater than start time");
        return [];
      }
      if (startDayjs.isSame(endDayjs, "month")) {
        return calculateValidatedDateRange(startDayjs, endDayjs);
      } else {
        if (startDayjs.add(1, "month").month() !== endDayjs.month()) {
          error.debugWarn("ElCalendar", "start time and end time interval must not exceed two months");
          return [];
        }
        return calculateValidatedDateRange(startDayjs, endDayjs);
      }
    });
    const pickDay = (day) => {
      realSelectedDay.value = day;
    };
    const selectDate = (type) => {
      let day;
      if (type === "prev-month") {
        day = prevMonthDayjs.value;
      } else if (type === "next-month") {
        day = nextMonthDayjs.value;
      } else if (type === "prev-year") {
        day = prevYearDayjs.value;
      } else if (type === "next-year") {
        day = nextYearDayjs.value;
      } else {
        day = now;
      }
      if (day.isSame(date.value, "day"))
        return;
      pickDay(day);
    };
    return {
      selectedDay,
      curMonthDatePrefix,
      i18nDate,
      realSelectedDay,
      date,
      validatedRange,
      pickDay,
      selectDate,
      t,
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_button_group = vue.resolveComponent("el-button-group");
  const _component_date_table = vue.resolveComponent("date-table");
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.ns.b())
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.ns.e("header"))
    }, [
      vue.renderSlot(_ctx.$slots, "header", { date: _ctx.i18nDate }, () => [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(_ctx.ns.e("title"))
        }, vue.toDisplayString(_ctx.i18nDate), 3),
        _ctx.validatedRange.length === 0 ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(_ctx.ns.e("button-group"))
        }, [
          vue.createVNode(_component_el_button_group, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_button, {
                size: "small",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.selectDate("prev-month"))
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.t("el.datepicker.prevMonth")), 1)
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_button, {
                size: "small",
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.selectDate("today"))
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.t("el.datepicker.today")), 1)
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_button, {
                size: "small",
                onClick: _cache[2] || (_cache[2] = ($event) => _ctx.selectDate("next-month"))
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.t("el.datepicker.nextMonth")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 2)) : vue.createCommentVNode("v-if", true)
      ])
    ], 2),
    _ctx.validatedRange.length === 0 ? (vue.openBlock(), vue.createElementBlock("div", {
      key: 0,
      class: vue.normalizeClass(_ctx.ns.e("body"))
    }, [
      vue.createVNode(_component_date_table, {
        date: _ctx.date,
        "selected-day": _ctx.realSelectedDay,
        onPick: _ctx.pickDay
      }, vue.createSlots({ _: 2 }, [
        _ctx.$slots.dateCell ? {
          name: "dateCell",
          fn: vue.withCtx((data) => [
            vue.renderSlot(_ctx.$slots, "dateCell", vue.normalizeProps(vue.guardReactiveProps(data)))
          ])
        } : void 0
      ]), 1032, ["date", "selected-day", "onPick"])
    ], 2)) : (vue.openBlock(), vue.createElementBlock("div", {
      key: 1,
      class: vue.normalizeClass(_ctx.ns.e("body"))
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.validatedRange, (range_, index) => {
        return vue.openBlock(), vue.createBlock(_component_date_table, {
          key: index,
          date: range_[0],
          "selected-day": _ctx.realSelectedDay,
          range: range_,
          "hide-header": index !== 0,
          onPick: _ctx.pickDay
        }, vue.createSlots({ _: 2 }, [
          _ctx.$slots.dateCell ? {
            name: "dateCell",
            fn: vue.withCtx((data) => [
              vue.renderSlot(_ctx.$slots, "dateCell", vue.normalizeProps(vue.guardReactiveProps(data)))
            ])
          } : void 0
        ]), 1032, ["date", "selected-day", "range", "hide-header", "onPick"]);
      }), 128))
    ], 2))
  ], 2);
}
var Calendar = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = Calendar;
//# sourceMappingURL=calendar2.js.map
