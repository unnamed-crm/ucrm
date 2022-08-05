export declare const ElOverlay: import("vue").DefineComponent<{
    readonly mask: import("../../utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly customMaskEvent: import("../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly overlayClass: import("../../utils").BuildPropReturn<import("../../utils").PropWrapper<string | string[] | Record<string, boolean>>, unknown, unknown, unknown, unknown>;
    readonly zIndex: import("../../utils").BuildPropReturn<import("../../utils").PropWrapper<import("csstype").ZIndexProperty>, unknown, unknown, unknown, unknown>;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (evt: MouseEvent) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly mask: import("../../utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly customMaskEvent: import("../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly overlayClass: import("../../utils").BuildPropReturn<import("../../utils").PropWrapper<string | string[] | Record<string, boolean>>, unknown, unknown, unknown, unknown>;
    readonly zIndex: import("../../utils").BuildPropReturn<import("../../utils").PropWrapper<import("csstype").ZIndexProperty>, unknown, unknown, unknown, unknown>;
}>> & {
    onClick?: ((evt: MouseEvent) => any) | undefined;
}, {
    zIndex: import("../../utils").BuildPropType<import("../../utils").PropWrapper<import("csstype").ZIndexProperty>, unknown, unknown>;
    mask: import("../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    customMaskEvent: import("../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    overlayClass: import("../../utils").BuildPropType<import("../../utils").PropWrapper<string | string[] | Record<string, boolean>>, unknown, unknown>;
}>;
export default ElOverlay;
export * from './src/overlay';
