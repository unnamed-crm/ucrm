declare const _default: import("vue").DefineComponent<{
    readonly command: import("element-plus/es/utils").BuildPropReturn<readonly [ObjectConstructor, StringConstructor, NumberConstructor], () => {}, unknown, unknown, unknown>;
    readonly disabled: BooleanConstructor;
    readonly divided: BooleanConstructor;
    readonly textValue: StringConstructor;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown, unknown, unknown>;
}, {
    handleClick: (event: PointerEvent) => void;
    handlePointerMove: (event: PointerEvent) => void;
    handlePointerLeave: (event: PointerEvent) => void;
    textContent: import("vue").ComputedRef<string>;
    propsAndAttrs: import("vue").ComputedRef<{
        icon: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown> | undefined;
        disabled: boolean;
        onClick: ((...args: any[]) => any) | undefined;
        onPointermove: ((...args: any[]) => any) | undefined;
        onPointerleave: ((...args: any[]) => any) | undefined;
        command: import("element-plus/es/utils").BuildPropType<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown>;
        divided: boolean;
        textValue: string | undefined;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "pointermove" | "pointerleave")[], "click" | "pointermove" | "pointerleave", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly command: import("element-plus/es/utils").BuildPropReturn<readonly [ObjectConstructor, StringConstructor, NumberConstructor], () => {}, unknown, unknown, unknown>;
    readonly disabled: BooleanConstructor;
    readonly divided: BooleanConstructor;
    readonly textValue: StringConstructor;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown, unknown, unknown>;
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onPointermove?: ((...args: any[]) => any) | undefined;
    onPointerleave?: ((...args: any[]) => any) | undefined;
}, {
    icon: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown>;
    disabled: boolean;
    command: import("element-plus/es/utils").BuildPropType<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown>;
    divided: boolean;
}>;
export default _default;
