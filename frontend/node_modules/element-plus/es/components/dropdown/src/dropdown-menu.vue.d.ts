declare const _default: import("vue").DefineComponent<{
    onKeydown: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(e: KeyboardEvent) => void>, unknown, unknown, unknown, unknown>;
}, {
    size: import("vue").ComputedRef<string> | undefined;
    rovingFocusGroupRootStyle: import("vue").Ref<import("vue").StyleValue>;
    tabIndex: import("vue").Ref<number>;
    dropdownKls: import("vue").ComputedRef<string[]>;
    dropdownListWrapperRef: (el: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | Element | null) => void;
    handleKeydown: (e: KeyboardEvent) => void;
    onBlur: (e: Event) => void;
    onFocus: (e: FocusEvent) => void;
    onMousedown: (e: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    onKeydown: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(e: KeyboardEvent) => void>, unknown, unknown, unknown, unknown>;
}>>, {
    onKeydown: (e: KeyboardEvent) => void;
}>;
export default _default;
