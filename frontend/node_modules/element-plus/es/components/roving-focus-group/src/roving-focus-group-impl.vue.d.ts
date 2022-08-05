import type { StyleValue } from 'vue';
declare const _default: import("vue").DefineComponent<{
    style: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<StyleValue>, unknown, unknown, unknown, unknown>;
    currentTabId: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | null>, unknown, unknown, unknown, unknown>;
    defaultCurrentTabId: StringConstructor;
    loop: BooleanConstructor;
    dir: import("element-plus/es/utils").BuildPropReturn<StringConstructor, string, unknown, string, unknown>;
    orientation: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<"horizontal" | "vertical" | undefined>, unknown, unknown, unknown, unknown>;
    onBlur: FunctionConstructor;
    onFocus: FunctionConstructor;
    onMousedown: FunctionConstructor;
}, void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("currentTabIdChange" | "entryFocus")[], "currentTabIdChange" | "entryFocus", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    style: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<StyleValue>, unknown, unknown, unknown, unknown>;
    currentTabId: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | null>, unknown, unknown, unknown, unknown>;
    defaultCurrentTabId: StringConstructor;
    loop: BooleanConstructor;
    dir: import("element-plus/es/utils").BuildPropReturn<StringConstructor, string, unknown, string, unknown>;
    orientation: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<"horizontal" | "vertical" | undefined>, unknown, unknown, unknown, unknown>;
    onBlur: FunctionConstructor;
    onFocus: FunctionConstructor;
    onMousedown: FunctionConstructor;
}>> & {
    onCurrentTabIdChange?: ((...args: any[]) => any) | undefined;
    onEntryFocus?: ((...args: any[]) => any) | undefined;
}, {
    style: StyleValue;
    dir: string;
    loop: boolean;
    currentTabId: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | null>, unknown, unknown>;
    orientation: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<"horizontal" | "vertical" | undefined>, unknown, unknown>;
}>;
export default _default;
