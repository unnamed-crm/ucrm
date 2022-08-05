export declare const ElPopconfirm: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
    readonly title: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly confirmButtonText: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly cancelButtonText: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly confirmButtonType: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "primary", unknown, "" | "default" | "primary" | "success" | "warning" | "info" | "danger" | "text", unknown>;
    readonly cancelButtonType: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "text", unknown, "" | "default" | "primary" | "success" | "warning" | "info" | "danger" | "text", unknown>;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>, unknown, unknown, unknown>;
    readonly iconColor: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "#f90", unknown, unknown, unknown>;
    readonly hideIcon: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly hideAfter: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 200, unknown, unknown, unknown>;
    readonly onConfirm: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(e: Event) => void | Promise<void>>, unknown, unknown, unknown, unknown>;
    readonly onCancel: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(e: Event) => void | Promise<void>>, unknown, unknown, unknown, unknown>;
    readonly teleported: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly persistent: BooleanConstructor;
}, {
    finalConfirmButtonText: import("vue").ComputedRef<string>;
    finalCancelButtonText: import("vue").ComputedRef<string>;
    tooltipRef: import("vue").Ref<{
        onClose: () => void;
    } | undefined>;
    ns: {
        namespace: import("vue").ComputedRef<string>;
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
    compatTeleported: import("vue").ComputedRef<boolean>;
    confirm: (e: Event) => void;
    cancel: (e: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly title: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly confirmButtonText: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly cancelButtonText: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly confirmButtonType: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "primary", unknown, "" | "default" | "primary" | "success" | "warning" | "info" | "danger" | "text", unknown>;
    readonly cancelButtonType: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "text", unknown, "" | "default" | "primary" | "success" | "warning" | "info" | "danger" | "text", unknown>;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>, unknown, unknown, unknown>;
    readonly iconColor: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "#f90", unknown, unknown, unknown>;
    readonly hideIcon: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly hideAfter: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 200, unknown, unknown, unknown>;
    readonly onConfirm: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(e: Event) => void | Promise<void>>, unknown, unknown, unknown, unknown>;
    readonly onCancel: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(e: Event) => void | Promise<void>>, unknown, unknown, unknown, unknown>;
    readonly teleported: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly persistent: BooleanConstructor;
}>>, {
    icon: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown>;
    title: string;
    hideAfter: number;
    teleported: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    persistent: boolean;
    confirmButtonText: string;
    cancelButtonText: string;
    confirmButtonType: import("element-plus/es/utils").BuildPropType<StringConstructor, "" | "default" | "primary" | "success" | "warning" | "info" | "danger" | "text", unknown>;
    cancelButtonType: import("element-plus/es/utils").BuildPropType<StringConstructor, "" | "default" | "primary" | "success" | "warning" | "info" | "danger" | "text", unknown>;
    iconColor: string;
    hideIcon: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    onConfirm: (e: Event) => void | Promise<void>;
    onCancel: (e: Event) => void | Promise<void>;
}>> & Record<string, any>;
export default ElPopconfirm;
export * from './src/popconfirm';
