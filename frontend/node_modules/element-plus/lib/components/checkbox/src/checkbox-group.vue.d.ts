import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: ArrayConstructor;
        default: () => never[];
    };
    disabled: BooleanConstructor;
    min: {
        type: NumberConstructor;
        default: undefined;
    };
    max: {
        type: NumberConstructor;
        default: undefined;
    };
    size: {
        type: PropType<"default" | "small" | "large">;
        validator: (val: string) => val is "" | "default" | "small" | "large";
    };
    fill: {
        type: StringConstructor;
        default: undefined;
    };
    textColor: {
        type: StringConstructor;
        default: undefined;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ArrayConstructor;
        default: () => never[];
    };
    disabled: BooleanConstructor;
    min: {
        type: NumberConstructor;
        default: undefined;
    };
    max: {
        type: NumberConstructor;
        default: undefined;
    };
    size: {
        type: PropType<"default" | "small" | "large">;
        validator: (val: string) => val is "" | "default" | "small" | "large";
    };
    fill: {
        type: StringConstructor;
        default: undefined;
    };
    textColor: {
        type: StringConstructor;
        default: undefined;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    fill: string;
    modelValue: unknown[];
    textColor: string;
    tag: string;
    max: number;
    min: number;
}>;
export default _default;
