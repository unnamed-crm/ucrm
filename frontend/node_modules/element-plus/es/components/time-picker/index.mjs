import TimePicker from './src/time-picker.mjs';
export { default as CommonPicker } from './src/common/picker.mjs';
export { default as TimePickPanel } from './src/time-picker-com/panel-time-pick.mjs';
export { extractDateFormat, extractTimeFormat, rangeArr } from './src/common/date-utils.mjs';
export { DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_DATEPICKER, DEFAULT_FORMATS_TIME } from './src/common/constant.mjs';
export { timePickerDefaultProps } from './src/common/props.mjs';

const _TimePicker = TimePicker;
_TimePicker.install = (app) => {
  app.component(_TimePicker.name, _TimePicker);
};
const ElTimePicker = _TimePicker;

export { ElTimePicker, _TimePicker as default };
//# sourceMappingURL=index.mjs.map
