import { defineComponent, ref, computed, inject, toRef, watch, resolveComponent, resolveDirective, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, Fragment, renderList, toDisplayString, createCommentVNode, createVNode, withDirectives, withCtx, createBlock, createTextVNode } from 'vue';
import dayjs from 'dayjs';
import { ElButton } from '../../../button/index.mjs';
import '../../../../directives/index.mjs';
import '../../../../hooks/index.mjs';
import { ElInput } from '../../../input/index.mjs';
import '../../../time-picker/index.mjs';
import { ElIcon } from '../../../icon/index.mjs';
import '../../../../utils/index.mjs';
import { DArrowLeft, ArrowLeft, DArrowRight, ArrowRight } from '@element-plus/icons-vue';
import DateTable from './basic-date-table.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import ClickOutside from '../../../../directives/click-outside/index.mjs';
import TimePickPanel from '../../../time-picker/src/time-picker-com/panel-time-pick.mjs';
import { isValidDatePickType } from '../../../../utils/vue/validator.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { extractTimeFormat, extractDateFormat } from '../../../time-picker/src/common/date-utils.mjs';

const _sfc_main = defineComponent({
  directives: { clickoutside: ClickOutside },
  components: {
    TimePickPanel,
    DateTable,
    ElInput,
    ElButton,
    ElIcon,
    DArrowLeft,
    ArrowLeft,
    DArrowRight,
    ArrowRight
  },
  props: {
    unlinkPanels: Boolean,
    parsedValue: {
      type: Array
    },
    type: {
      type: String,
      required: true,
      validator: isValidDatePickType
    }
  },
  emits: ["pick", "set-picker-option", "calendar-change", "panel-change"],
  setup(props, ctx) {
    const { t, lang } = useLocale();
    const leftDate = ref(dayjs().locale(lang.value));
    const rightDate = ref(dayjs().locale(lang.value).add(1, "month"));
    const minDate = ref(null);
    const maxDate = ref(null);
    const dateUserInput = ref({
      min: null,
      max: null
    });
    const timeUserInput = ref({
      min: null,
      max: null
    });
    const leftLabel = computed(() => {
      return `${leftDate.value.year()} ${t("el.datepicker.year")} ${t(`el.datepicker.month${leftDate.value.month() + 1}`)}`;
    });
    const rightLabel = computed(() => {
      return `${rightDate.value.year()} ${t("el.datepicker.year")} ${t(`el.datepicker.month${rightDate.value.month() + 1}`)}`;
    });
    const leftYear = computed(() => {
      return leftDate.value.year();
    });
    const leftMonth = computed(() => {
      return leftDate.value.month();
    });
    const rightYear = computed(() => {
      return rightDate.value.year();
    });
    const rightMonth = computed(() => {
      return rightDate.value.month();
    });
    const hasShortcuts = computed(() => !!shortcuts.length);
    const minVisibleDate = computed(() => {
      if (dateUserInput.value.min !== null)
        return dateUserInput.value.min;
      if (minDate.value)
        return minDate.value.format(dateFormat.value);
      return "";
    });
    const maxVisibleDate = computed(() => {
      if (dateUserInput.value.max !== null)
        return dateUserInput.value.max;
      if (maxDate.value || minDate.value)
        return (maxDate.value || minDate.value).format(dateFormat.value);
      return "";
    });
    const minVisibleTime = computed(() => {
      if (timeUserInput.value.min !== null)
        return timeUserInput.value.min;
      if (minDate.value)
        return minDate.value.format(timeFormat.value);
      return "";
    });
    const maxVisibleTime = computed(() => {
      if (timeUserInput.value.max !== null)
        return timeUserInput.value.max;
      if (maxDate.value || minDate.value)
        return (maxDate.value || minDate.value).format(timeFormat.value);
      return "";
    });
    const timeFormat = computed(() => {
      return extractTimeFormat(format);
    });
    const dateFormat = computed(() => {
      return extractDateFormat(format);
    });
    const leftPrevYear = () => {
      leftDate.value = leftDate.value.subtract(1, "year");
      if (!props.unlinkPanels) {
        rightDate.value = leftDate.value.add(1, "month");
      }
      handlePanelChange("year");
    };
    const leftPrevMonth = () => {
      leftDate.value = leftDate.value.subtract(1, "month");
      if (!props.unlinkPanels) {
        rightDate.value = leftDate.value.add(1, "month");
      }
      handlePanelChange("month");
    };
    const rightNextYear = () => {
      if (!props.unlinkPanels) {
        leftDate.value = leftDate.value.add(1, "year");
        rightDate.value = leftDate.value.add(1, "month");
      } else {
        rightDate.value = rightDate.value.add(1, "year");
      }
      handlePanelChange("year");
    };
    const rightNextMonth = () => {
      if (!props.unlinkPanels) {
        leftDate.value = leftDate.value.add(1, "month");
        rightDate.value = leftDate.value.add(1, "month");
      } else {
        rightDate.value = rightDate.value.add(1, "month");
      }
      handlePanelChange("month");
    };
    const leftNextYear = () => {
      leftDate.value = leftDate.value.add(1, "year");
      handlePanelChange("year");
    };
    const leftNextMonth = () => {
      leftDate.value = leftDate.value.add(1, "month");
      handlePanelChange("month");
    };
    const rightPrevYear = () => {
      rightDate.value = rightDate.value.subtract(1, "year");
      handlePanelChange("year");
    };
    const rightPrevMonth = () => {
      rightDate.value = rightDate.value.subtract(1, "month");
      handlePanelChange("month");
    };
    const handlePanelChange = (mode) => {
      ctx.emit("panel-change", [leftDate.value.toDate(), rightDate.value.toDate()], mode);
    };
    const enableMonthArrow = computed(() => {
      const nextMonth = (leftMonth.value + 1) % 12;
      const yearOffset = leftMonth.value + 1 >= 12 ? 1 : 0;
      return props.unlinkPanels && new Date(leftYear.value + yearOffset, nextMonth) < new Date(rightYear.value, rightMonth.value);
    });
    const enableYearArrow = computed(() => {
      return props.unlinkPanels && rightYear.value * 12 + rightMonth.value - (leftYear.value * 12 + leftMonth.value + 1) >= 12;
    });
    const isValidValue = (value) => {
      return Array.isArray(value) && value[0] && value[1] && value[0].valueOf() <= value[1].valueOf();
    };
    const rangeState = ref({
      endDate: null,
      selecting: false
    });
    const btnDisabled = computed(() => {
      return !(minDate.value && maxDate.value && !rangeState.value.selecting && isValidValue([minDate.value, maxDate.value]));
    });
    const handleChangeRange = (val) => {
      rangeState.value = val;
    };
    const onSelect = (selecting) => {
      rangeState.value.selecting = selecting;
      if (!selecting) {
        rangeState.value.endDate = null;
      }
    };
    const showTime = computed(() => props.type === "datetime" || props.type === "datetimerange");
    const handleConfirm = (visible = false) => {
      if (isValidValue([minDate.value, maxDate.value])) {
        ctx.emit("pick", [minDate.value, maxDate.value], visible);
      }
    };
    const formatEmit = (emitDayjs, index) => {
      if (!emitDayjs)
        return;
      if (defaultTime) {
        const defaultTimeD = dayjs(defaultTime[index] || defaultTime).locale(lang.value);
        return defaultTimeD.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
      }
      return emitDayjs;
    };
    const handleRangePick = (val, close = true) => {
      const min_ = val.minDate;
      const max_ = val.maxDate;
      const minDate_ = formatEmit(min_, 0);
      const maxDate_ = formatEmit(max_, 1);
      if (maxDate.value === maxDate_ && minDate.value === minDate_) {
        return;
      }
      ctx.emit("calendar-change", [min_.toDate(), max_ && max_.toDate()]);
      maxDate.value = maxDate_;
      minDate.value = minDate_;
      if (!close || showTime.value)
        return;
      handleConfirm();
    };
    const handleShortcutClick = (shortcut) => {
      const shortcutValues = typeof shortcut.value === "function" ? shortcut.value() : shortcut.value;
      if (shortcutValues) {
        ctx.emit("pick", [
          dayjs(shortcutValues[0]).locale(lang.value),
          dayjs(shortcutValues[1]).locale(lang.value)
        ]);
        return;
      }
      if (shortcut.onClick) {
        shortcut.onClick(ctx);
      }
    };
    const minTimePickerVisible = ref(false);
    const maxTimePickerVisible = ref(false);
    const handleMinTimeClose = () => {
      minTimePickerVisible.value = false;
    };
    const handleMaxTimeClose = () => {
      maxTimePickerVisible.value = false;
    };
    const handleDateInput = (value, type) => {
      dateUserInput.value[type] = value;
      const parsedValueD = dayjs(value, dateFormat.value).locale(lang.value);
      if (parsedValueD.isValid()) {
        if (disabledDate && disabledDate(parsedValueD.toDate())) {
          return;
        }
        if (type === "min") {
          leftDate.value = parsedValueD;
          minDate.value = (minDate.value || leftDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
          if (!props.unlinkPanels) {
            rightDate.value = parsedValueD.add(1, "month");
            maxDate.value = minDate.value.add(1, "month");
          }
        } else {
          rightDate.value = parsedValueD;
          maxDate.value = (maxDate.value || rightDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
          if (!props.unlinkPanels) {
            leftDate.value = parsedValueD.subtract(1, "month");
            minDate.value = maxDate.value.subtract(1, "month");
          }
        }
      }
    };
    const handleDateChange = (_, type) => {
      dateUserInput.value[type] = null;
    };
    const handleTimeInput = (value, type) => {
      timeUserInput.value[type] = value;
      const parsedValueD = dayjs(value, timeFormat.value).locale(lang.value);
      if (parsedValueD.isValid()) {
        if (type === "min") {
          minTimePickerVisible.value = true;
          minDate.value = (minDate.value || leftDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
          if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
            maxDate.value = minDate.value;
          }
        } else {
          maxTimePickerVisible.value = true;
          maxDate.value = (maxDate.value || rightDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
          rightDate.value = maxDate.value;
          if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
            minDate.value = maxDate.value;
          }
        }
      }
    };
    const handleTimeChange = (value, type) => {
      timeUserInput.value[type] = null;
      if (type === "min") {
        leftDate.value = minDate.value;
        minTimePickerVisible.value = false;
      } else {
        rightDate.value = maxDate.value;
        maxTimePickerVisible.value = false;
      }
    };
    const handleMinTimePick = (value, visible, first) => {
      if (timeUserInput.value.min)
        return;
      if (value) {
        leftDate.value = value;
        minDate.value = (minDate.value || leftDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
      }
      if (!first) {
        minTimePickerVisible.value = visible;
      }
      if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
        maxDate.value = minDate.value;
        rightDate.value = value;
      }
    };
    const handleMaxTimePick = (value, visible, first) => {
      if (timeUserInput.value.max)
        return;
      if (value) {
        rightDate.value = value;
        maxDate.value = (maxDate.value || rightDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
      }
      if (!first) {
        maxTimePickerVisible.value = visible;
      }
      if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
        minDate.value = maxDate.value;
      }
    };
    const handleClear = () => {
      leftDate.value = getDefaultValue()[0];
      rightDate.value = leftDate.value.add(1, "month");
      ctx.emit("pick", null);
    };
    const formatToString = (value) => {
      return Array.isArray(value) ? value.map((_) => _.format(format)) : value.format(format);
    };
    const parseUserInput = (value) => {
      return Array.isArray(value) ? value.map((_) => dayjs(_, format).locale(lang.value)) : dayjs(value, format).locale(lang.value);
    };
    const getDefaultValue = () => {
      let start;
      if (Array.isArray(defaultValue.value)) {
        const left = dayjs(defaultValue.value[0]);
        let right = dayjs(defaultValue.value[1]);
        if (!props.unlinkPanels) {
          right = left.add(1, "month");
        }
        return [left, right];
      } else if (defaultValue.value) {
        start = dayjs(defaultValue.value);
      } else {
        start = dayjs();
      }
      start = start.locale(lang.value);
      return [start, start.add(1, "month")];
    };
    ctx.emit("set-picker-option", ["isValidValue", isValidValue]);
    ctx.emit("set-picker-option", ["parseUserInput", parseUserInput]);
    ctx.emit("set-picker-option", ["formatToString", formatToString]);
    ctx.emit("set-picker-option", ["handleClear", handleClear]);
    const pickerBase = inject("EP_PICKER_BASE");
    const {
      shortcuts,
      disabledDate,
      cellClassName,
      format,
      defaultTime,
      arrowControl,
      clearable
    } = pickerBase.props;
    const defaultValue = toRef(pickerBase.props, "defaultValue");
    watch(() => defaultValue.value, (val) => {
      if (val) {
        const defaultArr = getDefaultValue();
        minDate.value = null;
        maxDate.value = null;
        leftDate.value = defaultArr[0];
        rightDate.value = defaultArr[1];
      }
    }, { immediate: true });
    watch(() => props.parsedValue, (newVal) => {
      if (newVal && newVal.length === 2) {
        minDate.value = newVal[0];
        maxDate.value = newVal[1];
        leftDate.value = minDate.value;
        if (props.unlinkPanels && maxDate.value) {
          const minDateYear = minDate.value.year();
          const minDateMonth = minDate.value.month();
          const maxDateYear = maxDate.value.year();
          const maxDateMonth = maxDate.value.month();
          rightDate.value = minDateYear === maxDateYear && minDateMonth === maxDateMonth ? maxDate.value.add(1, "month") : maxDate.value;
        } else {
          rightDate.value = leftDate.value.add(1, "month");
          if (maxDate.value) {
            rightDate.value = rightDate.value.hour(maxDate.value.hour()).minute(maxDate.value.minute()).second(maxDate.value.second());
          }
        }
      } else {
        const defaultArr = getDefaultValue();
        minDate.value = null;
        maxDate.value = null;
        leftDate.value = defaultArr[0];
        rightDate.value = defaultArr[1];
      }
    }, { immediate: true });
    return {
      shortcuts,
      disabledDate,
      cellClassName,
      minTimePickerVisible,
      maxTimePickerVisible,
      handleMinTimeClose,
      handleMaxTimeClose,
      handleShortcutClick,
      rangeState,
      minDate,
      maxDate,
      handleRangePick,
      onSelect,
      handleChangeRange,
      btnDisabled,
      enableYearArrow,
      enableMonthArrow,
      rightPrevMonth,
      rightPrevYear,
      rightNextMonth,
      rightNextYear,
      leftPrevMonth,
      leftPrevYear,
      leftNextMonth,
      leftNextYear,
      hasShortcuts,
      leftLabel,
      rightLabel,
      leftDate,
      rightDate,
      showTime,
      t,
      minVisibleDate,
      maxVisibleDate,
      minVisibleTime,
      maxVisibleTime,
      arrowControl,
      handleDateInput,
      handleDateChange,
      handleTimeInput,
      handleTimeChange,
      handleMinTimePick,
      handleMaxTimePick,
      handleClear,
      handleConfirm,
      timeFormat,
      clearable
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
  class: "el-date-range-picker__time-header"
};
const _hoisted_6 = { class: "el-date-range-picker__editors-wrap" };
const _hoisted_7 = { class: "el-date-range-picker__time-picker-wrap" };
const _hoisted_8 = { class: "el-date-range-picker__time-picker-wrap" };
const _hoisted_9 = { class: "el-date-range-picker__editors-wrap is-right" };
const _hoisted_10 = { class: "el-date-range-picker__time-picker-wrap" };
const _hoisted_11 = { class: "el-date-range-picker__time-picker-wrap" };
const _hoisted_12 = { class: "el-picker-panel__content el-date-range-picker__content is-left" };
const _hoisted_13 = { class: "el-date-range-picker__header" };
const _hoisted_14 = ["disabled"];
const _hoisted_15 = ["disabled"];
const _hoisted_16 = { class: "el-picker-panel__content el-date-range-picker__content is-right" };
const _hoisted_17 = { class: "el-date-range-picker__header" };
const _hoisted_18 = ["disabled"];
const _hoisted_19 = ["disabled"];
const _hoisted_20 = {
  key: 0,
  class: "el-picker-panel__footer"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_time_pick_panel = resolveComponent("time-pick-panel");
  const _component_arrow_right = resolveComponent("arrow-right");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_d_arrow_left = resolveComponent("d-arrow-left");
  const _component_arrow_left = resolveComponent("arrow-left");
  const _component_d_arrow_right = resolveComponent("d-arrow-right");
  const _component_date_table = resolveComponent("date-table");
  const _component_el_button = resolveComponent("el-button");
  const _directive_clickoutside = resolveDirective("clickoutside");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["el-picker-panel el-date-range-picker", [
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
            createElementVNode("span", _hoisted_7, [
              createVNode(_component_el_input, {
                size: "small",
                disabled: _ctx.rangeState.selecting,
                placeholder: _ctx.t("el.datepicker.startDate"),
                class: "el-date-range-picker__editor",
                "model-value": _ctx.minVisibleDate,
                onInput: _cache[0] || (_cache[0] = (val) => _ctx.handleDateInput(val, "min")),
                onChange: _cache[1] || (_cache[1] = (val) => _ctx.handleDateChange(val, "min"))
              }, null, 8, ["disabled", "placeholder", "model-value"])
            ]),
            withDirectives((openBlock(), createElementBlock("span", _hoisted_8, [
              createVNode(_component_el_input, {
                size: "small",
                class: "el-date-range-picker__editor",
                disabled: _ctx.rangeState.selecting,
                placeholder: _ctx.t("el.datepicker.startTime"),
                "model-value": _ctx.minVisibleTime,
                onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.minTimePickerVisible = true),
                onInput: _cache[3] || (_cache[3] = (val) => _ctx.handleTimeInput(val, "min")),
                onChange: _cache[4] || (_cache[4] = (val) => _ctx.handleTimeChange(val, "min"))
              }, null, 8, ["disabled", "placeholder", "model-value"]),
              createVNode(_component_time_pick_panel, {
                visible: _ctx.minTimePickerVisible,
                format: _ctx.timeFormat,
                "datetime-role": "start",
                "time-arrow-control": _ctx.arrowControl,
                "parsed-value": _ctx.leftDate,
                onPick: _ctx.handleMinTimePick
              }, null, 8, ["visible", "format", "time-arrow-control", "parsed-value", "onPick"])
            ])), [
              [_directive_clickoutside, _ctx.handleMinTimeClose]
            ])
          ]),
          createElementVNode("span", null, [
            createVNode(_component_el_icon, null, {
              default: withCtx(() => [
                createVNode(_component_arrow_right)
              ]),
              _: 1
            })
          ]),
          createElementVNode("span", _hoisted_9, [
            createElementVNode("span", _hoisted_10, [
              createVNode(_component_el_input, {
                size: "small",
                class: "el-date-range-picker__editor",
                disabled: _ctx.rangeState.selecting,
                placeholder: _ctx.t("el.datepicker.endDate"),
                "model-value": _ctx.maxVisibleDate,
                readonly: !_ctx.minDate,
                onInput: _cache[5] || (_cache[5] = (val) => _ctx.handleDateInput(val, "max")),
                onChange: _cache[6] || (_cache[6] = (val) => _ctx.handleDateChange(val, "max"))
              }, null, 8, ["disabled", "placeholder", "model-value", "readonly"])
            ]),
            withDirectives((openBlock(), createElementBlock("span", _hoisted_11, [
              createVNode(_component_el_input, {
                size: "small",
                class: "el-date-range-picker__editor",
                disabled: _ctx.rangeState.selecting,
                placeholder: _ctx.t("el.datepicker.endTime"),
                "model-value": _ctx.maxVisibleTime,
                readonly: !_ctx.minDate,
                onFocus: _cache[7] || (_cache[7] = ($event) => _ctx.minDate && (_ctx.maxTimePickerVisible = true)),
                onInput: _cache[8] || (_cache[8] = (val) => _ctx.handleTimeInput(val, "max")),
                onChange: _cache[9] || (_cache[9] = (val) => _ctx.handleTimeChange(val, "max"))
              }, null, 8, ["disabled", "placeholder", "model-value", "readonly"]),
              createVNode(_component_time_pick_panel, {
                "datetime-role": "end",
                visible: _ctx.maxTimePickerVisible,
                format: _ctx.timeFormat,
                "time-arrow-control": _ctx.arrowControl,
                "parsed-value": _ctx.rightDate,
                onPick: _ctx.handleMaxTimePick
              }, null, 8, ["visible", "format", "time-arrow-control", "parsed-value", "onPick"])
            ])), [
              [_directive_clickoutside, _ctx.handleMaxTimeClose]
            ])
          ])
        ])) : createCommentVNode("v-if", true),
        createElementVNode("div", _hoisted_12, [
          createElementVNode("div", _hoisted_13, [
            createElementVNode("button", {
              type: "button",
              class: "el-picker-panel__icon-btn d-arrow-left",
              onClick: _cache[10] || (_cache[10] = (...args) => _ctx.leftPrevYear && _ctx.leftPrevYear(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_d_arrow_left)
                ]),
                _: 1
              })
            ]),
            createElementVNode("button", {
              type: "button",
              class: "el-picker-panel__icon-btn arrow-left",
              onClick: _cache[11] || (_cache[11] = (...args) => _ctx.leftPrevMonth && _ctx.leftPrevMonth(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_arrow_left)
                ]),
                _: 1
              })
            ]),
            _ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              disabled: !_ctx.enableYearArrow,
              class: normalizeClass([{ "is-disabled": !_ctx.enableYearArrow }, "el-picker-panel__icon-btn d-arrow-right"]),
              onClick: _cache[12] || (_cache[12] = (...args) => _ctx.leftNextYear && _ctx.leftNextYear(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_d_arrow_right)
                ]),
                _: 1
              })
            ], 10, _hoisted_14)) : createCommentVNode("v-if", true),
            _ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              disabled: !_ctx.enableMonthArrow,
              class: normalizeClass([{ "is-disabled": !_ctx.enableMonthArrow }, "el-picker-panel__icon-btn arrow-right"]),
              onClick: _cache[13] || (_cache[13] = (...args) => _ctx.leftNextMonth && _ctx.leftNextMonth(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_arrow_right)
                ]),
                _: 1
              })
            ], 10, _hoisted_15)) : createCommentVNode("v-if", true),
            createElementVNode("div", null, toDisplayString(_ctx.leftLabel), 1)
          ]),
          createVNode(_component_date_table, {
            "selection-mode": "range",
            date: _ctx.leftDate,
            "min-date": _ctx.minDate,
            "max-date": _ctx.maxDate,
            "range-state": _ctx.rangeState,
            "disabled-date": _ctx.disabledDate,
            "cell-class-name": _ctx.cellClassName,
            onChangerange: _ctx.handleChangeRange,
            onPick: _ctx.handleRangePick,
            onSelect: _ctx.onSelect
          }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "onChangerange", "onPick", "onSelect"])
        ]),
        createElementVNode("div", _hoisted_16, [
          createElementVNode("div", _hoisted_17, [
            _ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              disabled: !_ctx.enableYearArrow,
              class: normalizeClass([{ "is-disabled": !_ctx.enableYearArrow }, "el-picker-panel__icon-btn d-arrow-left"]),
              onClick: _cache[14] || (_cache[14] = (...args) => _ctx.rightPrevYear && _ctx.rightPrevYear(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_d_arrow_left)
                ]),
                _: 1
              })
            ], 10, _hoisted_18)) : createCommentVNode("v-if", true),
            _ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              disabled: !_ctx.enableMonthArrow,
              class: normalizeClass([{ "is-disabled": !_ctx.enableMonthArrow }, "el-picker-panel__icon-btn arrow-left"]),
              onClick: _cache[15] || (_cache[15] = (...args) => _ctx.rightPrevMonth && _ctx.rightPrevMonth(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_arrow_left)
                ]),
                _: 1
              })
            ], 10, _hoisted_19)) : createCommentVNode("v-if", true),
            createElementVNode("button", {
              type: "button",
              class: "el-picker-panel__icon-btn d-arrow-right",
              onClick: _cache[16] || (_cache[16] = (...args) => _ctx.rightNextYear && _ctx.rightNextYear(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_d_arrow_right)
                ]),
                _: 1
              })
            ]),
            createElementVNode("button", {
              type: "button",
              class: "el-picker-panel__icon-btn arrow-right",
              onClick: _cache[17] || (_cache[17] = (...args) => _ctx.rightNextMonth && _ctx.rightNextMonth(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_arrow_right)
                ]),
                _: 1
              })
            ]),
            createElementVNode("div", null, toDisplayString(_ctx.rightLabel), 1)
          ]),
          createVNode(_component_date_table, {
            "selection-mode": "range",
            date: _ctx.rightDate,
            "min-date": _ctx.minDate,
            "max-date": _ctx.maxDate,
            "range-state": _ctx.rangeState,
            "disabled-date": _ctx.disabledDate,
            "cell-class-name": _ctx.cellClassName,
            onChangerange: _ctx.handleChangeRange,
            onPick: _ctx.handleRangePick,
            onSelect: _ctx.onSelect
          }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "onChangerange", "onPick", "onSelect"])
        ])
      ])
    ]),
    _ctx.showTime ? (openBlock(), createElementBlock("div", _hoisted_20, [
      _ctx.clearable ? (openBlock(), createBlock(_component_el_button, {
        key: 0,
        size: "small",
        type: "text",
        class: "el-picker-panel__link-btn",
        onClick: _ctx.handleClear
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.t("el.datepicker.clear")), 1)
        ]),
        _: 1
      }, 8, ["onClick"])) : createCommentVNode("v-if", true),
      createVNode(_component_el_button, {
        plain: "",
        size: "small",
        class: "el-picker-panel__link-btn",
        disabled: _ctx.btnDisabled,
        onClick: _cache[18] || (_cache[18] = ($event) => _ctx.handleConfirm(false))
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.t("el.datepicker.confirm")), 1)
        ]),
        _: 1
      }, 8, ["disabled"])
    ])) : createCommentVNode("v-if", true)
  ], 2);
}
var DateRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { DateRangePickPanel as default };
//# sourceMappingURL=panel-date-range.mjs.map
