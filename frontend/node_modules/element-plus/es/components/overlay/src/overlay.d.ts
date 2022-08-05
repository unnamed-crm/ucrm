import type { ExtractPropTypes } from 'vue';
import type { ZIndexProperty } from 'csstype';
export declare const overlayProps: {
    readonly mask: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly customMaskEvent: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly overlayClass: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | string[] | Record<string, boolean>>, unknown, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<ZIndexProperty>, unknown, unknown, unknown, unknown>;
};
export declare type OverlayProps = ExtractPropTypes<typeof overlayProps>;
export declare const overlayEmits: {
    click: (evt: MouseEvent) => boolean;
};
export declare type OverlayEmits = typeof overlayEmits;
declare const _default: import("vue").DefineComponent<{
    readonly mask: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly customMaskEvent: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly overlayClass: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | string[] | Record<string, boolean>>, unknown, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<ZIndexProperty>, unknown, unknown, unknown, unknown>;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (evt: MouseEvent) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly mask: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly customMaskEvent: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly overlayClass: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | string[] | Record<string, boolean>>, unknown, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<ZIndexProperty>, unknown, unknown, unknown, unknown>;
}>> & {
    onClick?: ((evt: MouseEvent) => any) | undefined;
}, {
    zIndex: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<ZIndexProperty>, unknown, unknown>;
    mask: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    customMaskEvent: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    overlayClass: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | string[] | Record<string, boolean>>, unknown, unknown>;
}>;
export default _default;
