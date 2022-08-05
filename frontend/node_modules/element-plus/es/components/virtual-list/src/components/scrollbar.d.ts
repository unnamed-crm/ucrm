declare const ScrollBar: import("vue").DefineComponent<{
    readonly layout: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "vertical", false, "horizontal" | "vertical", never>;
    readonly total: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, never, true, never, never>;
    readonly ratio: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, true, unknown, unknown>;
    readonly clientSize: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, true, unknown, unknown>;
    readonly scrollFrom: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, true, unknown, unknown>;
    readonly visible: BooleanConstructor;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("scroll" | "start-move" | "stop-move")[], "scroll" | "start-move" | "stop-move", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly layout: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "vertical", false, "horizontal" | "vertical", never>;
    readonly total: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, never, true, never, never>;
    readonly ratio: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, true, unknown, unknown>;
    readonly clientSize: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, true, unknown, unknown>;
    readonly scrollFrom: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, true, unknown, unknown>;
    readonly visible: BooleanConstructor;
}>> & {
    onScroll?: ((...args: any[]) => any) | undefined;
    "onStart-move"?: ((...args: any[]) => any) | undefined;
    "onStop-move"?: ((...args: any[]) => any) | undefined;
}, {
    visible: boolean;
    layout: import("element-plus/es/utils").BuildPropType<StringConstructor, "horizontal" | "vertical", never>;
}>;
export default ScrollBar;
