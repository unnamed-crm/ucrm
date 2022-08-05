import { defineComponent, provide, ref, h, renderSlot } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localeData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import '../../time-picker/index.mjs';
import DatePickPanel from './date-picker-com/panel-date-pick.mjs';
import DateRangePickPanel from './date-picker-com/panel-date-range.mjs';
import MonthRangePickPanel from './date-picker-com/panel-month-range.mjs';
import { ROOT_PICKER_INJECTION_KEY } from './date-picker.type.mjs';
import { timePickerDefaultProps } from '../../time-picker/src/common/props.mjs';
import { DEFAULT_FORMATS_DATEPICKER, DEFAULT_FORMATS_DATE } from '../../time-picker/src/common/constant.mjs';
import CommonPicker from '../../time-picker/src/common/picker.mjs';

dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(dayOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
const getPanel = function(type) {
  if (type === "daterange" || type === "datetimerange") {
    return DateRangePickPanel;
  } else if (type === "monthrange") {
    return MonthRangePickPanel;
  }
  return DatePickPanel;
};
var DatePicker = defineComponent({
  name: "ElDatePicker",
  install: null,
  props: {
    ...timePickerDefaultProps,
    type: {
      type: String,
      default: "date"
    }
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    provide("ElPopperOptions", props.popperOptions);
    provide(ROOT_PICKER_INJECTION_KEY, {
      ctx
    });
    const commonPicker = ref(null);
    const refProps = {
      ...props,
      focus: (focusStartInput = true) => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.focus(focusStartInput);
      }
    };
    ctx.expose(refProps);
    return () => {
      var _a;
      const format = (_a = props.format) != null ? _a : DEFAULT_FORMATS_DATEPICKER[props.type] || DEFAULT_FORMATS_DATE;
      return h(CommonPicker, {
        ...props,
        format,
        type: props.type,
        ref: commonPicker,
        "onUpdate:modelValue": (value) => ctx.emit("update:modelValue", value)
      }, {
        default: (scopedProps) => h(getPanel(props.type), scopedProps),
        "range-separator": () => renderSlot(ctx.slots, "range-separator")
      });
    };
  }
});

export { DatePicker as default };
//# sourceMappingURL=date-picker.mjs.map
