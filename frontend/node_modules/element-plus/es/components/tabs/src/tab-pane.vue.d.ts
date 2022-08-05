declare const _default: import("vue").DefineComponent<{
    readonly label: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly name: import("element-plus/es/utils").BuildPropReturn<readonly [StringConstructor, NumberConstructor], "", unknown, unknown, unknown>;
    readonly closable: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly lazy: BooleanConstructor;
}, {
    active: Readonly<import("vue").Ref<boolean>>;
    paneName: import("vue").ComputedRef<import("element-plus/es/utils").BuildPropType<readonly [StringConstructor, NumberConstructor], unknown, unknown> | undefined>;
    shouldBeRender: Readonly<import("vue").Ref<boolean>>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly label: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly name: import("element-plus/es/utils").BuildPropReturn<readonly [StringConstructor, NumberConstructor], "", unknown, unknown, unknown>;
    readonly closable: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly lazy: BooleanConstructor;
}>>, {
    disabled: boolean;
    name: import("element-plus/es/utils").BuildPropType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
    label: string;
    closable: boolean;
    lazy: boolean;
}>;
export default _default;
