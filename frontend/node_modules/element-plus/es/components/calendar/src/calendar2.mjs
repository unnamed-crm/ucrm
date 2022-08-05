import { defineComponent, ref, computed, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, toDisplayString, createVNode, withCtx, createTextVNode, createCommentVNode, createSlots, normalizeProps, guardReactiveProps, Fragment, renderList, createBlock } from 'vue';
import dayjs from 'dayjs';
import { ElButton, ElButtonGroup } from '../../button/index.mjs';
import '../../../hooks/index.mjs';
import '../../../utils/index.mjs';
import DateTable from './date-table2.mjs';
import { calendarProps, calendarEmits } from './calendar.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { debugWarn } from '../../../utils/error.mjs';

const _sfc_main = defineComponent({
  name: "ElCalendar",
  components: {
    DateTable,
    ElButton,
    ElButtonGroup
  },
  props: calendarProps,
  emits: calendarEmits,
  setup(props, { emit }) {
    const ns = useNamespace("calendar");
    const { t, lang } = useLocale();
    const selectedDay = ref();
    const now = dayjs().locale(lang.value);
    const prevMonthDayjs = computed(() => {
      return date.value.subtract(1, "month").date(1);
    });
    const curMonthDatePrefix = computed(() => {
      return dayjs(date.value).locale(lang.value).format("YYYY-MM");
    });
    const nextMonthDayjs = computed(() => {
      return date.value.add(1, "month").date(1);
    });
    const prevYearDayjs = computed(() => {
      return date.value.subtract(1, "year").date(1);
    });
    const nextYearDayjs = computed(() => {
      return date.value.add(1, "year").date(1);
    });
    const i18nDate = computed(() => {
      const pickedMonth = `el.datepicker.month${date.value.format("M")}`;
      return `${date.value.year()} ${t("el.datepicker.year")} ${t(pickedMonth)}`;
    });
    const realSelectedDay = computed({
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
    const date = computed(() => {
      if (!props.modelValue) {
        if (realSelectedDay.value) {
          return realSelectedDay.value;
        } else if (validatedRange.value.length) {
          return validatedRange.value[0][0];
        }
        return now;
      } else {
        return dayjs(props.modelValue).locale(lang.value);
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
        debugWarn("ElCalendar", "start time and end time interval must not exceed two months");
        return [];
      }
    };
    const validatedRange = computed(() => {
      if (!props.range)
        return [];
      const rangeArrDayjs = props.range.map((_) => dayjs(_).locale(lang.value));
      const [startDayjs, endDayjs] = rangeArrDayjs;
      if (startDayjs.isAfter(endDayjs)) {
        debugWarn("ElCalendar", "end time should be greater than start time");
        return [];
      }
      if (startDayjs.isSame(endDayjs, "month")) {
        return calculateValidatedDateRange(startDayjs, endDayjs);
      } else {
        if (startDayjs.add(1, "month").month() !== endDayjs.month()) {
          debugWarn("ElCalendar", "start time and end time interval must not exceed two months");
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
  const _component_el_button = resolveComponent("el-button");
  const _component_el_button_group = resolveComponent("el-button-group");
  const _component_date_table = resolveComponent("date-table");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.ns.b())
  }, [
    createElementVNode("div", {
      class: normalizeClass(_ctx.ns.e("header"))
    }, [
      renderSlot(_ctx.$slots, "header", { date: _ctx.i18nDate }, () => [
        createElementVNode("div", {
          class: normalizeClass(_ctx.ns.e("title"))
        }, toDisplayString(_ctx.i18nDate), 3),
        _ctx.validatedRange.length === 0 ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.ns.e("button-group"))
        }, [
          createVNode(_component_el_button_group, null, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                size: "small",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.selectDate("prev-month"))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.t("el.datepicker.prevMonth")), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                size: "small",
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.selectDate("today"))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.t("el.datepicker.today")), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                size: "small",
                onClick: _cache[2] || (_cache[2] = ($event) => _ctx.selectDate("next-month"))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.t("el.datepicker.nextMonth")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 2)) : createCommentVNode("v-if", true)
      ])
    ], 2),
    _ctx.validatedRange.length === 0 ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.ns.e("body"))
    }, [
      createVNode(_component_date_table, {
        date: _ctx.date,
        "selected-day": _ctx.realSelectedDay,
        onPick: _ctx.pickDay
      }, createSlots({ _: 2 }, [
        _ctx.$slots.dateCell ? {
          name: "dateCell",
          fn: withCtx((data) => [
            renderSlot(_ctx.$slots, "dateCell", normalizeProps(guardReactiveProps(data)))
          ])
        } : void 0
      ]), 1032, ["date", "selected-day", "onPick"])
    ], 2)) : (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(_ctx.ns.e("body"))
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.validatedRange, (range_, index) => {
        return openBlock(), createBlock(_component_date_table, {
          key: index,
          date: range_[0],
          "selected-day": _ctx.realSelectedDay,
          range: range_,
          "hide-header": index !== 0,
          onPick: _ctx.pickDay
        }, createSlots({ _: 2 }, [
          _ctx.$slots.dateCell ? {
            name: "dateCell",
            fn: withCtx((data) => [
              renderSlot(_ctx.$slots, "dateCell", normalizeProps(guardReactiveProps(data)))
            ])
          } : void 0
        ]), 1032, ["date", "selected-day", "range", "hide-header", "onPick"]);
      }), 128))
    ], 2))
  ], 2);
}
var Calendar = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Calendar as default };
//# sourceMappingURL=calendar2.mjs.map
