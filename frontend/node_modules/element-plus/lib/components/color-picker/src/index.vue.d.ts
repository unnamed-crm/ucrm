import Color from './color';
import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: StringConstructor;
    showAlpha: BooleanConstructor;
    colorFormat: StringConstructor;
    disabled: BooleanConstructor;
    size: {
        type: PropType<"default" | "small" | "large">;
        validator: (val: string) => val is "" | "default" | "small" | "large";
    };
    popperClass: StringConstructor;
    predefine: ArrayConstructor;
}, {
    color: Color;
    colorDisabled: import("vue").ComputedRef<boolean>;
    colorSize: import("vue").ComputedRef<"default" | "small" | "large">;
    displayedColor: import("vue").ComputedRef<string>;
    showPanelColor: import("vue").Ref<boolean>;
    showPicker: import("vue").Ref<boolean>;
    customInput: import("vue").Ref<string>;
    handleConfirm: () => void;
    hide: () => void;
    handleTrigger: () => void;
    clear: () => void;
    confirmValue: () => void;
    t: import("element-plus/es/hooks").Translator;
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
    hue: import("vue").Ref<null>;
    svPanel: import("vue").Ref<null>;
    alpha: import("vue").Ref<null>;
    popper: import("vue").Ref<null>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "active-change")[], "update:modelValue" | "change" | "active-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: StringConstructor;
    showAlpha: BooleanConstructor;
    colorFormat: StringConstructor;
    disabled: BooleanConstructor;
    size: {
        type: PropType<"default" | "small" | "large">;
        validator: (val: string) => val is "" | "default" | "small" | "large";
    };
    popperClass: StringConstructor;
    predefine: ArrayConstructor;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onActive-change"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    showAlpha: boolean;
}>;
export default _default;
