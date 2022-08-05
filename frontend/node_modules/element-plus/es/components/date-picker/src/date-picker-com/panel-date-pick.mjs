import { defineComponent, inject, toRef, ref, computed, watch, resolveComponent, resolveDirective, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, Fragment, renderList, toDisplayString, createCommentVNode, createVNode, withDirectives, withCtx, vShow, createBlock, createTextVNode } from 'vue';
import dayjs from 'dayjs';
import { ElButton } from '../../../button/index.mjs';
import '../../../../directives/index.mjs';
import '../../../../hooks/index.mjs';
import { ElInput } from '../../../input/index.mjs';
import '../../../time-picker/index.mjs';
import { ElIcon } from '../../../icon/index.mjs';
import '../../../../utils/index.mjs';
import '../../../../constants/index.mjs';
import { DArrowLeft, ArrowLeft, DArrowRight, ArrowRight } from '@element-plus/icons-vue';
import '../../../tooltip/index.mjs';
import DateTable from './basic-date-table.mjs';
import MonthTable from './basic-month-table.mjs';
import YearTable from './basic-year-table.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import TimePickPanel from '../../../time-picker/src/time-picker-com/panel-time-pick.mjs';
import ClickOutside from '../../../../directives/click-outside/index.mjs';
import { isValidDatePickType } from '../../../../utils/vue/validator.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { TOOLTIP_INJECTION_KEY } from '../../../tooltip/src/tokens.mjs';
import { extractTimeFormat, extractDateFormat } from '../../../time-picker/src/common/date-utils.mjs';
import { EVENT_CODE } from '../../../../constants/aria.mjs';

const timeWithinRange = (_, __, ___) => true;
const _sfc_main = defineComponent({
  components: {
    DateTable,
    ElInput,
    ElButton,
    ElIcon,
    TimePickPanel,
    MonthTable,
    YearTable,
    DArrowLeft,
    ArrowLeft,
    DArrowRight,
    ArrowRight
  },
  directives: { clickoutside: ClickOutside },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    parsedValue: {
      type: [Object, Array]
    },
    format: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      required: true,
      validator: isValidDatePickType
    }
  },
  emits: ["pick", "set-picker-option", "panel-change"],
  setup(props, ctx) {
    const { t, lang } = useLocale();
    const pickerBase = inject("EP_PICKER_BASE");
    const popper = inject(TOOLTIP_INJECTION_KEY);
    const {
      shortcuts,
      disabledDate,
      cellClassName,
      defaultTime,
      arrowControl
    } = pickerBase.props;
    const defaultValue = toRef(pickerBase.props, "defaultValue");
    const innerDate = ref(dayjs().locale(lang.value));
    const defaultTimeD = computed(() => {
      return dayjs(defaultTime).locale(lang.value);
    });
    const month = computed(() => {
      return innerDate.value.month();
    });
    const year = computed(() => {
      return innerDate.value.year();
    });
    const selectableRange = ref([]);
    const userInputDate = ref(null);
    const userInputTime = ref(null);
    const checkDateWithinRange = (date) => {
      return selectableRange.value.length > 0 ? timeWithinRange(date, selectableRange.value, props.format || "HH:mm:ss") : true;
    };
    const formatEmit = (emitDayjs) => {
      if (defaultTime && !visibleTime.value) {
        return defaultTimeD.value.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
      }
      if (showTime.value)
        return emitDayjs.millisecond(0);
      return emitDayjs.startOf("day");
    };
    const emit = (value, ...args) => {
      if (!value) {
        ctx.emit("pick", value, ...args);
      } else if (Array.isArray(value)) {
        const dates = value.map(formatEmit);
        ctx.emit("pick", dates, ...args);
      } else {
        ctx.emit("pick", formatEmit(value), ...args);
      }
      userInputDate.value = null;
      userInputTime.value = null;
    };
    const handleDatePick = (value) => {
      if (selectionMode.value === "day") {
        let newDate = props.parsedValue ? props.parsedValue.year(value.year()).month(value.month()).date(value.date()) : value;
        if (!checkDateWithinRange(newDate)) {
          newDate = selectableRange.value[0][0].year(value.year()).month(value.month()).date(value.date());
        }
        innerDate.value = newDate;
        emit(newDate, showTime.value);
      } else if (selectionMode.value === "week") {
        emit(value.date);
      } else if (selectionMode.value === "dates") {
        emit(value, true);
      }
    };
    const prevMonth_ = () => {
      innerDate.value = innerDate.value.subtract(1, "month");
      handlePanelChange("month");
    };
    const nextMonth_ = () => {
      innerDate.value = innerDate.value.add(1, "month");
      handlePanelChange("month");
    };
    const prevYear_ = () => {
      if (currentView.value === "year") {
        innerDate.value = innerDate.value.subtract(10, "year");
      } else {
        innerDate.value = innerDate.value.subtract(1, "year");
      }
      handlePanelChange("year");
    };
    const nextYear_ = () => {
      if (currentView.value === "year") {
        innerDate.value = innerDate.value.add(10, "year");
      } else {
        innerDate.value = innerDate.value.add(1, "year");
      }
      handlePanelChange("year");
    };
    const currentView = ref("date");
    const yearLabel = computed(() => {
      const yearTranslation = t("el.datepicker.year");
      if (currentView.value === "year") {
        const startYear = Math.floor(year.value / 10) * 10;
        if (yearTranslation) {
          return `${startYear} ${yearTranslation} - ${startYear + 9} ${yearTranslation}`;
        }
        return `${startYear} - ${startYear + 9}`;
      }
      return `${year.value} ${yearTranslation}`;
    });
    const handleShortcutClick = (shortcut) => {
      const shortcutValue = typeof shortcut.value === "function" ? shortcut.value() : shortcut.value;
      if (shortcutValue) {
        emit(dayjs(shortcutValue).locale(lang.value));
        return;
      }
      if (shortcut.onClick) {
        shortcut.onClick(ctx);
      }
    };
    const selectionMode = computed(() => {
      if (["week", "month", "year", "dates"].includes(props.type)) {
        return props.type;
      }
      return "day";
    });
    watch(() => selectionMode.value, (val) => {
      if (["month", "year"].includes(val)) {
        currentView.value = val;
        return;
      }
      currentView.value = "date";
    }, { immediate: true });
    watch(() => currentView.value, () => {
      popper == null ? void 0 : popper.updatePopper();
    });
    const hasShortcuts = computed(() => !!shortcuts.length);
    const handleMonthPick = (month2) => {
      innerDate.value = innerDate.value.startOf("month").month(month2);
      if (selectionMode.value === "month") {
        emit(innerDate.value);
      } else {
        currentView.value = "date";
      }
      handlePanelChange("month");
    };
    const handleYearPick = (year2) => {
      if (selectionMode.value === "year") {
        innerDate.value = innerDate.value.startOf("year").year(year2);
        emit(innerDate.value);
      } else {
        innerDate.value = innerDate.value.year(year2);
        currentView.value = "month";
      }
      handlePanelChange("year");
    };
    const showMonthPicker = () => {
      currentView.value = "month";
    };
    const showYearPicker = () => {
      currentView.value = "year";
    };
    const showTime = computed(() => props.type === "datetime" || props.type === "datetimerange");
    const footerVisible = computed(() => {
      return showTime.value || selectionMode.value === "dates";
    });
    const onConfirm = () => {
      if (selectionMode.value === "dates") {
        emit(props.parsedValue);
      } else {
        let result = props.parsedValue;
        if (!result) {
          const defaultTimeD2 = dayjs(defaultTime).locale(lang.value);
          const defaultValueD = getDefaultValue();
          result = defaultTimeD2.year(defaultValueD.year()).month(defaultValueD.month()).date(defaultValueD.date());
        }
        innerDate.value = result;
        emit(result);
      }
    };
    const changeToNow = () => {
      const now = dayjs().locale(lang.value);
      const nowDate = now.toDate();
      if ((!disabledDate || !disabledDate(nowDate)) && checkDateWithinRange(nowDate)) {
        innerDate.value = dayjs().locale(lang.value);
        emit(innerDate.value);
      }
    };
    const timeFormat = computed(() => {
      return extractTimeFormat(props.format);
    });
    const dateFormat = computed(() => {
      return extractDateFormat(props.format);
    });
    const visibleTime = computed(() => {
      if (userInputTime.value)
        return userInputTime.value;
      if (!props.parsedValue && !defaultValue.value)
        return;
      return (props.parsedValue || innerDate.value).format(timeFormat.value);
    });
    const visibleDate = computed(() => {
      if (userInputDate.value)
        return userInputDate.value;
      if (!props.parsedValue && !defaultValue.value)
        return;
      return (props.parsedValue || innerDate.value).format(dateFormat.value);
    });
    const timePickerVisible = ref(false);
    const onTimePickerInputFocus = () => {
      timePickerVisible.value = true;
    };
    const handleTimePickClose = () => {
      timePickerVisible.value = false;
    };
    const handleTimePick = (value, visible, first) => {
      const newDate = props.parsedValue ? props.parsedValue.hour(value.hour()).minute(value.minute()).second(value.second()) : value;
      innerDate.value = newDate;
      emit(innerDate.value, true);
      if (!first) {
        timePickerVisible.value = visible;
      }
    };
    const handleVisibleTimeChange = (value) => {
      const newDate = dayjs(value, timeFormat.value).locale(lang.value);
      if (newDate.isValid() && checkDateWithinRange(newDate)) {
        innerDate.value = newDate.year(innerDate.value.year()).month(innerDate.value.month()).date(innerDate.value.date());
        userInputTime.value = null;
        timePickerVisible.value = false;
        emit(innerDate.value, true);
      }
    };
    const handleVisibleDateChange = (value) => {
      const newDate = dayjs(value, dateFormat.value).locale(lang.value);
      if (newDate.isValid()) {
        if (disabledDate && disabledDate(newDate.toDate())) {
          return;
        }
        innerDate.value = newDate.hour(innerDate.value.hour()).minute(innerDate.value.minute()).second(innerDate.value.second());
        userInputDate.value = null;
        emit(innerDate.value, true);
      }
    };
    const isValidValue = (date) => {
      return dayjs.isDayjs(date) && date.isValid() && (disabledDate ? !disabledDate(date.toDate()) : true);
    };
    const formatToString = (value) => {
      if (selectionMode.value === "dates") {
        return value.map((_) => _.format(props.format));
      }
      return value.format(props.format);
    };
    const parseUserInput = (value) => {
      return dayjs(value, props.format).locale(lang.value);
    };
    const getDefaultValue = () => {
      const parseDate = dayjs(defaultValue.value).locale(lang.value);
      if (!defaultValue.value) {
        const defaultTimeDValue = defaultTimeD.value;
        return dayjs().hour(defaultTimeDValue.hour()).minute(defaultTimeDValue.minute()).second(defaultTimeDValue.second()).locale(lang.value);
      }
      return parseDate;
    };
    const handleKeydown = (event) => {
      const { code, keyCode } = event;
      const list = [
        EVENT_CODE.up,
        EVENT_CODE.down,
        EVENT_CODE.left,
        EVENT_CODE.right
      ];
      if (props.visible && !timePickerVisible.value) {
        if (list.includes(code)) {
          handleKeyControl(keyCode);
          event.stopPropagation();
          event.preventDefault();
        }
        if (code === EVENT_CODE.enter && userInputDate.value === null && userInputTime.value === null) {
          emit(innerDate, false);
        }
      }
    };
    const handleKeyControl = (keyCode) => {
      const mapping = {
        year: {
          38: -4,
          40: 4,
          37: -1,
          39: 1,
          offset: (date, step) => date.setFullYear(date.getFullYear() + step)
        },
        month: {
          38: -4,
          40: 4,
          37: -1,
          39: 1,
          offset: (date, step) => date.setMonth(date.getMonth() + step)
        },
        week: {
          38: -1,
          40: 1,
          37: -1,
          39: 1,
          offset: (date, step) => date.setDate(date.getDate() + step * 7)
        },
        day: {
          38: -7,
          40: 7,
          37: -1,
          39: 1,
          offset: (date, step) => date.setDate(date.getDate() + step)
        }
      };
      const newDate = innerDate.value.toDate();
      while (Math.abs(innerDate.value.diff(newDate, "year", true)) < 1) {
        const map = mapping[selectionMode.value];
        map.offset(newDate, map[keyCode]);
        if (disabledDate && disabledDate(newDate)) {
          continue;
        }
        const result = dayjs(newDate).locale(lang.value);
        innerDate.value = result;
        ctx.emit("pick", result, true);
        break;
      }
    };
    const handlePanelChange = (mode) => {
      ctx.emit("panel-change", innerDate.value.toDate(), mode, currentView.value);
    };
    ctx.emit("set-picker-option", ["isValidValue", isValidValue]);
    ctx.emit("set-picker-option", ["formatToString", formatToString]);
    ctx.emit("set-picker-option", ["parseUserInput", parseUserInput]);
    ctx.emit("set-picker-option", ["handleKeydown", handleKeydown]);
    watch(() => defaultValue.value, (val) => {
      if (val) {
        innerDate.value = getDefaultValue();
      }
    }, { immediate: true });
    watch(() => props.parsedValue, (val) => {
      if (val) {
        if (selectionMode.value === "dates")
          return;
        if (Array.isArray(val))
          return;
        innerDate.value = val;
      } else {
        innerDate.value = getDefaultValue();
      }
    }, { immediate: true });
    return {
      handleTimePick,
      handleTimePickClose,
      onTimePickerInputFocus,
      timePickerVisible,
      visibleTime,
      visibleDate,
      showTime,
      changeToNow,
      onConfirm,
      footerVisible,
      handleYearPick,
      showMonthPicker,
      showYearPicker,
      handleMonthPick,
      hasShortcuts,
      shortcuts,
      arrowControl,
      disabledDate,
      cellClassName,
      selectionMode,
      handleShortcutClick,
      prevYear_,
      nextYear_,
      prevMonth_,
      nextMonth_,
      innerDate,
      t,
      yearLabel,
      currentView,
      month,
      handleDatePick,
      handleVisibleTimeChange,
      handleVisibleDateChange,
      timeFormat,
      userInputTime,
      userInputDate
    };
  }
});
const _hoisted_1 = { class: "el-picker-panel__body-wrapper" };
const _hoisted_2 = {
  key: 0,
  class: "el-picker-panel__sidebar"
};
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "el-picker-panel__body" };
const _hoisted_5 = {
  key: 0,
  class: "el-date-picker__time-header"
};
const _hoisted_6 = { class: "el-date-picker__editor-wrap" };
const _hoisted_7 = { class: "el-date-picker__editor-wrap" };
const _hoisted_8 = ["aria-label"];
const _hoisted_9 = ["aria-label"];
const _hoisted_10 = ["aria-label"];
const _hoisted_11 = ["aria-label"];
const _hoisted_12 = { class: "el-picker-panel__content" };
const _hoisted_13 = { class: "el-picker-panel__footer" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_time_pick_panel = resolveComponent("time-pick-panel");
  const _component_d_arrow_left = resolveComponent("d-arrow-left");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_arrow_left = resolveComponent("arrow-left");
  const _component_d_arrow_right = resolveComponent("d-arrow-right");
  const _component_arrow_right = resolveComponent("arrow-right");
  const _component_date_table = resolveComponent("date-table");
  const _component_year_table = resolveComponent("year-table");
  const _component_month_table = resolveComponent("month-table");
  const _component_el_button = resolveComponent("el-button");
  const _directive_clickoutside = resolveDirective("clickoutside");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["el-picker-panel el-date-picker", [
      {
        "has-sidebar": _ctx.$slots.sidebar || _ctx.hasShortcuts,
        "has-time": _ctx.showTime
      }
    ]])
  }, [
    createElementVNode("div", _hoisted_1, [
      renderSlot(_ctx.$slots, "sidebar", { class: "el-picker-panel__sidebar" }),
      _ctx.hasShortcuts ? (openBlock(), createElementBlock("div", _hoisted_2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.shortcuts, (shortcut, key) => {
          return openBlock(), createElementBlock("button", {
            key,
            type: "button",
            class: "el-picker-panel__shortcut",
            onClick: ($event) => _ctx.handleShortcutClick(shortcut)
          }, toDisplayString(shortcut.text), 9, _hoisted_3);
        }), 128))
      ])) : createCommentVNode("v-if", true),
      createElementVNode("div", _hoisted_4, [
        _ctx.showTime ? (openBlock(), createElementBlock("div", _hoisted_5, [
          createElementVNode("span", _hoisted_6, [
            createVNode(_component_el_input, {
              placeholder: _ctx.t("el.datepicker.selectDate"),
              "model-value": _ctx.visibleDate,
              size: "small",
              onInput: _cache[0] || (_cache[0] = (val) => _ctx.userInputDate = val),
              onChange: _ctx.handleVisibleDateChange
            }, null, 8, ["placeholder", "model-value", "onChange"])
          ]),
          withDirectives((openBlock(), createElementBlock("span", _hoisted_7, [
            createVNode(_component_el_input, {
              placeholder: _ctx.t("el.datepicker.selectTime"),
              "model-value": _ctx.visibleTime,
              size: "small",
              onFocus: _ctx.onTimePickerInputFocus,
              onInput: _cache[1] || (_cache[1] = (val) => _ctx.userInputTime = val),
              onChange: _ctx.handleVisibleTimeChange
            }, null, 8, ["placeholder", "model-value", "onFocus", "onChange"]),
            createVNode(_component_time_pick_panel, {
              visible: _ctx.timePickerVisible,
              format: _ctx.timeFormat,
              "time-arrow-control": _ctx.arrowControl,
              "parsed-value": _ctx.innerDate,
              onPick: _ctx.handleTimePick
            }, null, 8, ["visible", "format", "time-arrow-control", "parsed-value", "onPick"])
          ])), [
            [_directive_clickoutside, _ctx.handleTimePickClose]
          ])
        ])) : createCommentVNode("v-if", true),
        withDirectives(createElementVNode("div", {
          class: normalizeClass(["el-date-picker__header", {
            "el-date-picker__header--bordered": _ctx.currentView === "year" || _ctx.currentView === "month"
          }])
        }, [
          createElementVNode("button", {
            type: "button",
            "aria-label": _ctx.t(`el.datepicker.prevYear`),
            class: "el-picker-panel__icon-btn el-date-picker__prev-btn d-arrow-left",
            onClick: _cache[2] || (_cache[2] = (...args) => _ctx.prevYear_ && _ctx.prevYear_(...args))
          }, [
            createVNode(_component_el_icon, null, {
              default: withCtx(() => [
                createVNode(_component_d_arrow_left)
              ]),
              _: 1
            })
          ], 8, _hoisted_8),
          withDirectives(createElementVNode("button", {
            type: "button",
            "aria-label": _ctx.t(`el.datepicker.prevMonth`),
            class: "el-picker-panel__icon-btn el-date-picker__prev-btn arrow-left",
            onClick: _cache[3] || (_cache[3] = (...args) => _ctx.prevMonth_ && _ctx.prevMonth_(...args))
          }, [
            createVNode(_component_el_icon, null, {
              default: withCtx(() => [
                createVNode(_component_arrow_left)
              ]),
              _: 1
            })
          ], 8, _hoisted_9), [
            [vShow, _ctx.currentView === "date"]
          ]),
          createElementVNode("span", {
            role: "button",
            class: "el-date-picker__header-label",
            onClick: _cache[4] || (_cache[4] = (...args) => _ctx.showYearPicker && _ctx.showYearPicker(...args))
          }, toDisplayString(_ctx.yearLabel), 1),
          withDirectives(createElementVNode("span", {
            role: "button",
            class: normalizeClass(["el-date-picker__header-label", { active: _ctx.currentView === "month" }]),
            onClick: _cache[5] || (_cache[5] = (...args) => _ctx.showMonthPicker && _ctx.showMonthPicker(...args))
          }, toDisplayString(_ctx.t(`el.datepicker.month${_ctx.month + 1}`)), 3), [
            [vShow, _ctx.currentView === "date"]
          ]),
          createElementVNode("button", {
            type: "button",
            "aria-label": _ctx.t(`el.datepicker.nextYear`),
            class: "el-picker-panel__icon-btn el-date-picker__next-btn d-arrow-right",
            onClick: _cache[6] || (_cache[6] = (...args) => _ctx.nextYear_ && _ctx.nextYear_(...args))
          }, [
            createVNode(_component_el_icon, null, {
              default: withCtx(() => [
                createVNode(_component_d_arrow_right)
              ]),
              _: 1
            })
          ], 8, _hoisted_10),
          withDirectives(createElementVNode("button", {
            type: "button",
            "aria-label": _ctx.t(`el.datepicker.nextMonth`),
            class: "el-picker-panel__icon-btn el-date-picker__next-btn arrow-right",
            onClick: _cache[7] || (_cache[7] = (...args) => _ctx.nextMonth_ && _ctx.nextMonth_(...args))
          }, [
            createVNode(_component_el_icon, null, {
              default: withCtx(() => [
                createVNode(_component_arrow_right)
              ]),
              _: 1
            })
          ], 8, _hoisted_11), [
            [vShow, _ctx.currentView === "date"]
          ])
        ], 2), [
          [vShow, _ctx.currentView !== "time"]
        ]),
        createElementVNode("div", _hoisted_12, [
          _ctx.currentView === "date" ? (openBlock(), createBlock(_component_date_table, {
            key: 0,
            "selection-mode": _ctx.selectionMode,
            date: _ctx.innerDate,
            "parsed-value": _ctx.parsedValue,
            "disabled-date": _ctx.disabledDate,
            onPick: _ctx.handleDatePick
          }, null, 8, ["selection-mode", "date", "parsed-value", "disabled-date", "onPick"])) : createCommentVNode("v-if", true),
          _ctx.currentView === "year" ? (openBlock(), createBlock(_component_year_table, {
            key: 1,
            date: _ctx.innerDate,
            "disabled-date": _ctx.disabledDate,
            "parsed-value": _ctx.parsedValue,
            onPick: _ctx.handleYearPick
          }, null, 8, ["date", "disabled-date", "parsed-value", "onPick"])) : createCommentVNode("v-if", true),
          _ctx.currentView === "month" ? (openBlock(), createBlock(_component_month_table, {
            key: 2,
            date: _ctx.innerDate,
            "parsed-value": _ctx.parsedValue,
            "disabled-date": _ctx.disabledDate,
            onPick: _ctx.handleMonthPick
          }, null, 8, ["date", "parsed-value", "disabled-date", "onPick"])) : createCommentVNode("v-if", true)
        ])
      ])
    ]),
    withDirectives(createElementVNode("div", _hoisted_13, [
      withDirectives(createVNode(_component_el_button, {
        size: "small",
        type: "text",
        class: "el-picker-panel__link-btn",
        onClick: _ctx.changeToNow
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.t("el.datepicker.now")), 1)
        ]),
        _: 1
      }, 8, ["onClick"]), [
        [vShow, _ctx.selectionMode !== "dates"]
      ]),
      createVNode(_component_el_button, {
        plain: "",
        size: "small",
        class: "el-picker-panel__link-btn",
        onClick: _ctx.onConfirm
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.t("el.datepicker.confirm")), 1)
        ]),
        _: 1
      }, 8, ["onClick"])
    ], 512), [
      [vShow, _ctx.footerVisible && _ctx.currentView === "date"]
    ])
  ], 2);
}
var DatePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { DatePickPanel as default };
//# sourceMappingURL=panel-date-pick.mjs.map
