declare const _default: import("vue").DefineComponent<{
    readonly command: import("element-plus/es/utils").BuildPropReturn<readonly [ObjectConstructor, StringConstructor, NumberConstructor], () => {}, unknown, unknown, unknown>;
    readonly disabled: BooleanConstructor;
    readonly divided: BooleanConstructor;
    readonly textValue: StringConstructor;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown, unknown, unknown>;
}, {
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
    itemRef: (el: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | Element | null) => void;
    dataset: {
        "data-el-collection-item": string;
    };
    tabIndex: import("vue").Ref<number>;
    handleFocus: (e: Event) => void;
    handleKeydown: (event: KeyboardEvent) => void;
    handleMousedown: (e: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "pointermove" | "pointerleave" | "clickimpl")[], "click" | "pointermove" | "pointerleave" | "clickimpl", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly command: import("element-plus/es/utils").BuildPropReturn<readonly [ObjectConstructor, StringConstructor, NumberConstructor], () => {}, unknown, unknown, unknown>;
    readonly disabled: BooleanConstructor;
    readonly divided: BooleanConstructor;
    readonly textValue: StringConstructor;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown, unknown, unknown>;
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onPointermove?: ((...args: any[]) => any) | undefined;
    onPointerleave?: ((...args: any[]) => any) | undefined;
    onClickimpl?: ((...args: any[]) => any) | undefined;
}, {
    icon: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown>;
    disabled: boolean;
    command: import("element-plus/es/utils").BuildPropType<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown>;
    divided: boolean;
}>;
export default _default;
