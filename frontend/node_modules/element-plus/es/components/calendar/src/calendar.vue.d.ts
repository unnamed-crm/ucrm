import dayjs from 'dayjs';
import type { ComputedRef } from 'vue';
import type { Dayjs } from 'dayjs';
declare type DateType = 'prev-month' | 'next-month' | 'prev-year' | 'next-year' | 'today';
declare const _default: import("vue").DefineComponent<{
    readonly modelValue: import("element-plus/es/utils").BuildPropReturn<DateConstructor, unknown, unknown, unknown, unknown>;
    readonly range: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<[Date, Date]>, unknown, unknown, unknown, [Date, Date]>;
}, {
    selectedDay: import("vue").Ref<dayjs.Dayjs | undefined>;
    curMonthDatePrefix: ComputedRef<string>;
    i18nDate: ComputedRef<string>;
    realSelectedDay: import("vue").WritableComputedRef<dayjs.Dayjs | undefined>;
    date: ComputedRef<dayjs.Dayjs>;
    validatedRange: ComputedRef<[dayjs.Dayjs, dayjs.Dayjs][]>;
    pickDay: (day: Dayjs) => void;
    selectDate: (type: DateType) => void;
    t: import("element-plus/es/hooks").Translator;
    ns: {
        namespace: ComputedRef<string>;
        b: (blockSuffix?: string) => string;
        e: (element?: string | undefined) => string;
        m: (modifier?: string | undefined) => string;
        be: (blockSuffix?: string | undefined, element?: string | undefined) => string;
        em: (element?: string | undefined, modifier?: string | undefined) => string;
        bm: (blockSuffix?: string | undefined, modifier?: string | undefined) => string;
        bem: (blockSuffix?: string | undefined, element?: string | undefined, modifier?: string | undefined) => string;
        is: {
            (name: string, state: boolean | undefined): string;
            (name: string): string;
        };
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: Date) => boolean;
    input: (value: Date) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: import("element-plus/es/utils").BuildPropReturn<DateConstructor, unknown, unknown, unknown, unknown>;
    readonly range: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<[Date, Date]>, unknown, unknown, unknown, [Date, Date]>;
}>> & {
    "onUpdate:modelValue"?: ((value: Date) => any) | undefined;
    onInput?: ((value: Date) => any) | undefined;
}, {
    modelValue: Date;
    range: [Date, Date];
}>;
export default _default;
