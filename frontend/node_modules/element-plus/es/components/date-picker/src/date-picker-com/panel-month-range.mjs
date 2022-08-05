import { defineComponent, ref, computed, inject, toRef, watch, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, Fragment, renderList, toDisplayString, createCommentVNode, createVNode, withCtx } from 'vue';
import dayjs from 'dayjs';
import { ElIcon } from '../../../icon/index.mjs';
import '../../../../hooks/index.mjs';
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue';
import MonthTable from './basic-month-table.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';

const _sfc_main = defineComponent({
  components: { MonthTable, ElIcon, DArrowLeft, DArrowRight },
  props: {
    unlinkPanels: Boolean,
    parsedValue: {
      type: Array
    }
  },
  emits: ["pick", "set-picker-option"],
  setup(props, ctx) {
    const { t, lang } = useLocale();
    const leftDate = ref(dayjs().locale(lang.value));
    const rightDate = ref(dayjs().locale(lang.value).add(1, "year"));
    const hasShortcuts = computed(() => !!shortcuts.length);
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
    const leftPrevYear = () => {
      leftDate.value = leftDate.value.subtract(1, "year");
      if (!props.unlinkPanels) {
        rightDate.value = rightDate.value.subtract(1, "year");
      }
    };
    const rightNextYear = () => {
      if (!props.unlinkPanels) {
        leftDate.value = leftDate.value.add(1, "year");
      }
      rightDate.value = rightDate.value.add(1, "year");
    };
    const leftNextYear = () => {
      leftDate.value = leftDate.value.add(1, "year");
    };
    const rightPrevYear = () => {
      rightDate.value = rightDate.value.subtract(1, "year");
    };
    const leftLabel = computed(() => {
      return `${leftDate.value.year()} ${t("el.datepicker.year")}`;
    });
    const rightLabel = computed(() => {
      return `${rightDate.value.year()} ${t("el.datepicker.year")}`;
    });
    const leftYear = computed(() => {
      return leftDate.value.year();
    });
    const rightYear = computed(() => {
      return rightDate.value.year() === leftDate.value.year() ? leftDate.value.year() + 1 : rightDate.value.year();
    });
    const enableYearArrow = computed(() => {
      return props.unlinkPanels && rightYear.value > leftYear.value + 1;
    });
    const minDate = ref(null);
    const maxDate = ref(null);
    const rangeState = ref({
      endDate: null,
      selecting: false
    });
    const handleChangeRange = (val) => {
      rangeState.value = val;
    };
    const handleRangePick = (val, close = true) => {
      const minDate_ = val.minDate;
      const maxDate_ = val.maxDate;
      if (maxDate.value === maxDate_ && minDate.value === minDate_) {
        return;
      }
      maxDate.value = maxDate_;
      minDate.value = minDate_;
      if (!close)
        return;
      handleConfirm();
    };
    const isValidValue = (value) => {
      return Array.isArray(value) && value && value[0] && value[1] && value[0].valueOf() <= value[1].valueOf();
    };
    const handleConfirm = (visible = false) => {
      if (isValidValue([minDate.value, maxDate.value])) {
        ctx.emit("pick", [minDate.value, maxDate.value], visible);
      }
    };
    const onSelect = (selecting) => {
      rangeState.value.selecting = selecting;
      if (!selecting) {
        rangeState.value.endDate = null;
      }
    };
    const formatToString = (value) => {
      return value.map((_) => _.format(format));
    };
    const getDefaultValue = () => {
      let start;
      if (Array.isArray(defaultValue.value)) {
        const left = dayjs(defaultValue.value[0]);
        let right = dayjs(defaultValue.value[1]);
        if (!props.unlinkPanels) {
          right = left.add(1, "year");
        }
        return [left, right];
      } else if (defaultValue.value) {
        start = dayjs(defaultValue.value);
      } else {
        start = dayjs();
      }
      start = start.locale(lang.value);
      return [start, start.add(1, "year")];
    };
    ctx.emit("set-picker-option", ["formatToString", formatToString]);
    const pickerBase = inject("EP_PICKER_BASE");
    const { shortcuts, disabledDate, format } = pickerBase.props;
    const defaultValue = toRef(pickerBase.props, "defaultValue");
    watch(() => defaultValue.value, (val) => {
      if (val) {
        const defaultArr = getDefaultValue();
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
          const maxDateYear = maxDate.value.year();
          rightDate.value = minDateYear === maxDateYear ? maxDate.value.add(1, "year") : maxDate.value;
        } else {
          rightDate.value = leftDate.value.add(1, "year");
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
      onSelect,
      handleRangePick,
      rangeState,
      handleChangeRange,
      minDate,
      maxDate,
      enableYearArrow,
      leftLabel,
      rightLabel,
      leftNextYear,
      leftPrevYear,
      rightNextYear,
      rightPrevYear,
      t,
      leftDate,
      rightDate,
      hasShortcuts,
      handleShortcutClick
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
const _hoisted_5 = { class: "el-picker-panel__content el-date-range-picker__content is-left" };
const _hoisted_6 = { class: "el-date-range-picker__header" };
const _hoisted_7 = ["disabled"];
const _hoisted_8 = { class: "el-picker-panel__content el-date-range-picker__content is-right" };
const _hoisted_9 = { class: "el-date-range-picker__header" };
const _hoisted_10 = ["disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_d_arrow_left = resolveComponent("d-arrow-left");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_d_arrow_right = resolveComponent("d-arrow-right");
  const _component_month_table = resolveComponent("month-table");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["el-picker-panel el-date-range-picker", [
      {
        "has-sidebar": _ctx.$slots.sidebar || _ctx.hasShortcuts
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
        createElementVNode("div", _hoisted_5, [
          createElementVNode("div", _hoisted_6, [
            createElementVNode("button", {
              type: "button",
              class: "el-picker-panel__icon-btn d-arrow-left",
              onClick: _cache[0] || (_cache[0] = (...args) => _ctx.leftPrevYear && _ctx.leftPrevYear(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_d_arrow_left)
                ]),
                _: 1
              })
            ]),
            _ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              disabled: !_ctx.enableYearArrow,
              class: normalizeClass([{ "is-disabled": !_ctx.enableYearArrow }, "el-picker-panel__icon-btn d-arrow-right"]),
              onClick: _cache[1] || (_cache[1] = (...args) => _ctx.leftNextYear && _ctx.leftNextYear(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_d_arrow_right)
                ]),
                _: 1
              })
            ], 10, _hoisted_7)) : createCommentVNode("v-if", true),
            createElementVNode("div", null, toDisplayString(_ctx.leftLabel), 1)
          ]),
          createVNode(_component_month_table, {
            "selection-mode": "range",
            date: _ctx.leftDate,
            "min-date": _ctx.minDate,
            "max-date": _ctx.maxDate,
            "range-state": _ctx.rangeState,
            "disabled-date": _ctx.disabledDate,
            onChangerange: _ctx.handleChangeRange,
            onPick: _ctx.handleRangePick,
            onSelect: _ctx.onSelect
          }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onPick", "onSelect"])
        ]),
        createElementVNode("div", _hoisted_8, [
          createElementVNode("div", _hoisted_9, [
            _ctx.unlinkPanels ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              disabled: !_ctx.enableYearArrow,
              class: normalizeClass([{ "is-disabled": !_ctx.enableYearArrow }, "el-picker-panel__icon-btn d-arrow-left"]),
              onClick: _cache[2] || (_cache[2] = (...args) => _ctx.rightPrevYear && _ctx.rightPrevYear(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_d_arrow_left)
                ]),
                _: 1
              })
            ], 10, _hoisted_10)) : createCommentVNode("v-if", true),
            createElementVNode("button", {
              type: "button",
              class: "el-picker-panel__icon-btn d-arrow-right",
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.rightNextYear && _ctx.rightNextYear(...args))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_d_arrow_right)
                ]),
                _: 1
              })
            ]),
            createElementVNode("div", null, toDisplayString(_ctx.rightLabel), 1)
          ]),
          createVNode(_component_month_table, {
            "selection-mode": "range",
            date: _ctx.rightDate,
            "min-date": _ctx.minDate,
            "max-date": _ctx.maxDate,
            "range-state": _ctx.rangeState,
            "disabled-date": _ctx.disabledDate,
            onChangerange: _ctx.handleChangeRange,
            onPick: _ctx.handleRangePick,
            onSelect: _ctx.onSelect
          }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onPick", "onSelect"])
        ])
      ])
    ])
  ], 2);
}
var MonthRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { MonthRangePickPanel as default };
//# sourceMappingURL=panel-month-range.mjs.map
