import type { ExtractPropTypes } from '@vue/runtime-core';
export declare const radioGroupProps: {
    readonly size: import("element-plus/es/utils").BuildPropReturn<StringConstructor, never, false, "default" | "small" | "large", never>;
    readonly disabled: BooleanConstructor;
    readonly modelValue: import("element-plus/es/utils").BuildPropReturn<readonly [StringConstructor, NumberConstructor, BooleanConstructor], "", unknown, unknown, unknown>;
    readonly fill: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly textColor: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
};
export declare type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
export declare const radioGroupEmits: {
    "update:modelValue": (val: string | number | boolean) => boolean;
    change: (val: string | number | boolean) => boolean;
};
export declare type RadioGroupEmits = typeof radioGroupEmits;
