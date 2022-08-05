import type { ExtractPropTypes } from 'vue';
export declare const calendarProps: {
    readonly modelValue: import("element-plus/es/utils").BuildPropReturn<DateConstructor, unknown, unknown, unknown, unknown>;
    readonly range: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<[Date, Date]>, unknown, unknown, unknown, [Date, Date]>;
};
export declare type CalendarProps = ExtractPropTypes<typeof calendarProps>;
export declare const calendarEmits: {
    "update:modelValue": (value: Date) => boolean;
    input: (value: Date) => boolean;
};
export declare type CalendarEmits = typeof calendarEmits;
