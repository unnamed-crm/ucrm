import { defineComponent, ref, provide, h } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DEFAULT_FORMATS_TIME } from './common/constant.mjs';
import CommonPicker from './common/picker.mjs';
import TimePickPanel from './time-picker-com/panel-time-pick.mjs';
import TimeRangePanel from './time-picker-com/panel-time-range.mjs';
import { timePickerDefaultProps } from './common/props.mjs';

dayjs.extend(customParseFormat);
var TimePicker = defineComponent({
  name: "ElTimePicker",
  install: null,
  props: {
    ...timePickerDefaultProps,
    isRange: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const commonPicker = ref(null);
    const type = props.isRange ? "timerange" : "time";
    const panel = props.isRange ? TimeRangePanel : TimePickPanel;
    const refProps = {
      ...props,
      focus: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.handleFocus();
      },
      blur: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.handleBlur();
      }
    };
    provide("ElPopperOptions", props.popperOptions);
    ctx.expose(refProps);
    return () => {
      var _a;
      const format = (_a = props.format) != null ? _a : DEFAULT_FORMATS_TIME;
      return h(CommonPicker, {
        ...props,
        format,
        type,
        ref: commonPicker,
        "onUpdate:modelValue": (value) => ctx.emit("update:modelValue", value)
      }, {
        default: (scopedProps) => h(panel, scopedProps)
      });
    };
  }
});

export { TimePicker as default };
//# sourceMappingURL=time-picker.mjs.map
