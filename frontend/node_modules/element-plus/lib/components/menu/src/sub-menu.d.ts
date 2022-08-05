import type { ExtractPropTypes } from 'vue';
export declare const subMenuProps: {
    readonly index: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, true, unknown, unknown>;
    readonly showTimeout: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 300, unknown, unknown, unknown>;
    readonly hideTimeout: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 300, unknown, unknown, unknown>;
    readonly popperClass: StringConstructor;
    readonly disabled: BooleanConstructor;
    readonly popperAppendToBody: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, undefined, unknown, unknown, unknown>;
    readonly popperOffset: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 6, unknown, unknown, unknown>;
};
export declare type SubMenuProps = ExtractPropTypes<typeof subMenuProps>;
declare const _default: import("vue").DefineComponent<{
    readonly index: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, true, unknown, unknown>;
    readonly showTimeout: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 300, unknown, unknown, unknown>;
    readonly hideTimeout: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 300, unknown, unknown, unknown>;
    readonly popperClass: StringConstructor;
    readonly disabled: BooleanConstructor;
    readonly popperAppendToBody: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, undefined, unknown, unknown, unknown>;
    readonly popperOffset: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 6, unknown, unknown, unknown>;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly index: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, true, unknown, unknown>;
    readonly showTimeout: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 300, unknown, unknown, unknown>;
    readonly hideTimeout: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 300, unknown, unknown, unknown>;
    readonly popperClass: StringConstructor;
    readonly disabled: BooleanConstructor;
    readonly popperAppendToBody: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, undefined, unknown, unknown, unknown>;
    readonly popperOffset: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 6, unknown, unknown, unknown>;
}>>, {
    disabled: boolean;
    popperAppendToBody: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    showTimeout: number;
    hideTimeout: number;
    popperOffset: number;
}>;
export default _default;
