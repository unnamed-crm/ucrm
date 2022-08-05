import type { Component, ExtractPropTypes } from 'vue';
export declare const popconfirmProps: {
    readonly title: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly confirmButtonText: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly cancelButtonText: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly confirmButtonType: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "primary", unknown, "" | "default" | "primary" | "success" | "warning" | "info" | "danger" | "text", unknown>;
    readonly cancelButtonType: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "text", unknown, "" | "default" | "primary" | "success" | "warning" | "info" | "danger" | "text", unknown>;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>, unknown, unknown, unknown>;
    readonly iconColor: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "#f90", unknown, unknown, unknown>;
    readonly hideIcon: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly hideAfter: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 200, unknown, unknown, unknown>;
    readonly onConfirm: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(e: Event) => Promise<void> | void>, unknown, unknown, unknown, unknown>;
    readonly onCancel: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(e: Event) => Promise<void> | void>, unknown, unknown, unknown, unknown>;
    readonly teleported: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly persistent: BooleanConstructor;
};
export declare type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>;
