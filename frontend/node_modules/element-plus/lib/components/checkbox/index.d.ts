export declare const ElCheckbox: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        default: () => undefined;
    };
    label: {
        type: (BooleanConstructor | ObjectConstructor | StringConstructor | NumberConstructor)[];
    };
    indeterminate: BooleanConstructor;
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: undefined;
    };
    trueLabel: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    falseLabel: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    id: {
        type: StringConstructor;
        default: undefined;
    };
    controls: {
        type: StringConstructor;
        default: undefined;
    };
    border: BooleanConstructor;
    size: {
        type: import("vue").PropType<"default" | "small" | "large">;
        validator: (val: string) => val is "" | "default" | "small" | "large";
    };
    tabindex: (StringConstructor | NumberConstructor)[];
}, {
    isChecked: import("vue").ComputedRef<boolean>;
    isDisabled: import("vue").ComputedRef<boolean>;
    checkboxSize: import("vue").ComputedRef<"default" | "small" | "large">;
    model: import("vue").WritableComputedRef<any>;
    handleChange: (e: InputEvent) => void;
    focus: import("vue").Ref<boolean>;
    size: import("vue").ComputedRef<"default" | "small" | "large">;
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        default: () => undefined;
    };
    label: {
        type: (BooleanConstructor | ObjectConstructor | StringConstructor | NumberConstructor)[];
    };
    indeterminate: BooleanConstructor;
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: undefined;
    };
    trueLabel: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    falseLabel: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    id: {
        type: StringConstructor;
        default: undefined;
    };
    controls: {
        type: StringConstructor;
        default: undefined;
    };
    border: BooleanConstructor;
    size: {
        type: import("vue").PropType<"default" | "small" | "large">;
        validator: (val: string) => val is "" | "default" | "small" | "large";
    };
    tabindex: (StringConstructor | NumberConstructor)[];
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    name: string;
    modelValue: string | number | boolean;
    border: boolean;
    id: string;
    indeterminate: boolean;
    checked: boolean;
    trueLabel: string | number;
    falseLabel: string | number;
    controls: string;
}>> & {
    CheckboxButton: import("vue").DefineComponent<{
        modelValue: {
            type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
            default: () => undefined;
        };
        label: {
            type: (BooleanConstructor | ObjectConstructor | StringConstructor | NumberConstructor)[];
        };
        indeterminate: BooleanConstructor;
        disabled: BooleanConstructor;
        checked: BooleanConstructor;
        name: {
            type: StringConstructor;
            default: undefined;
        };
        trueLabel: {
            type: (StringConstructor | NumberConstructor)[];
            default: undefined;
        };
        falseLabel: {
            type: (StringConstructor | NumberConstructor)[];
            default: undefined;
        };
        tabindex: (StringConstructor | NumberConstructor)[];
        size: StringConstructor;
    }, {
        focus: import("vue").Ref<boolean>;
        isChecked: import("vue").ComputedRef<boolean>;
        isDisabled: import("vue").ComputedRef<boolean>;
        model: import("vue").WritableComputedRef<any>;
        handleChange: (e: InputEvent) => void;
        activeStyle: import("vue").ComputedRef<{
            backgroundColor: string;
            borderColor: string;
            color: string;
            boxShadow: string | null;
        }>;
        size: import("vue").ComputedRef<"default" | "small" | "large">;
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
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
            default: () => undefined;
        };
        label: {
            type: (BooleanConstructor | ObjectConstructor | StringConstructor | NumberConstructor)[];
        };
        indeterminate: BooleanConstructor;
        disabled: BooleanConstructor;
        checked: BooleanConstructor;
        name: {
            type: StringConstructor;
            default: undefined;
        };
        trueLabel: {
            type: (StringConstructor | NumberConstructor)[];
            default: undefined;
        };
        falseLabel: {
            type: (StringConstructor | NumberConstructor)[];
            default: undefined;
        };
        tabindex: (StringConstructor | NumberConstructor)[];
        size: StringConstructor;
    }>> & {
        onChange?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }, {
        disabled: boolean;
        name: string;
        modelValue: string | number | boolean;
        indeterminate: boolean;
        checked: boolean;
        trueLabel: string | number;
        falseLabel: string | number;
    }>;
    CheckboxGroup: import("vue").DefineComponent<{
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
            type: import("vue").PropType<"default" | "small" | "large">;
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
            type: import("vue").PropType<"default" | "small" | "large">;
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
};
export default ElCheckbox;
export declare const ElCheckboxButton: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        default: () => undefined;
    };
    label: {
        type: (BooleanConstructor | ObjectConstructor | StringConstructor | NumberConstructor)[];
    };
    indeterminate: BooleanConstructor;
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: undefined;
    };
    trueLabel: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    falseLabel: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    tabindex: (StringConstructor | NumberConstructor)[];
    size: StringConstructor;
}, {
    focus: import("vue").Ref<boolean>;
    isChecked: import("vue").ComputedRef<boolean>;
    isDisabled: import("vue").ComputedRef<boolean>;
    model: import("vue").WritableComputedRef<any>;
    handleChange: (e: InputEvent) => void;
    activeStyle: import("vue").ComputedRef<{
        backgroundColor: string;
        borderColor: string;
        color: string;
        boxShadow: string | null;
    }>;
    size: import("vue").ComputedRef<"default" | "small" | "large">;
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        default: () => undefined;
    };
    label: {
        type: (BooleanConstructor | ObjectConstructor | StringConstructor | NumberConstructor)[];
    };
    indeterminate: BooleanConstructor;
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: undefined;
    };
    trueLabel: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    falseLabel: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    tabindex: (StringConstructor | NumberConstructor)[];
    size: StringConstructor;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    name: string;
    modelValue: string | number | boolean;
    indeterminate: boolean;
    checked: boolean;
    trueLabel: string | number;
    falseLabel: string | number;
}>>;
export declare const ElCheckboxGroup: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
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
        type: import("vue").PropType<"default" | "small" | "large">;
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
        type: import("vue").PropType<"default" | "small" | "large">;
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
}>>;
