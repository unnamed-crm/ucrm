declare const _default: import("vue").DefineComponent<{
    readonly checked: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        readonly checked: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    }>> & {
        onChange?: ((value: boolean) => any) | undefined;
        "onUpdate:checked"?: ((value: boolean) => any) | undefined;
    }>>;
    emit: ((event: "change", value: boolean) => void) & ((event: "update:checked", value: boolean) => void);
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
    handleChange: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    'update:checked': (value: boolean) => boolean;
    change: (value: boolean) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly checked: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
}>> & {
    onChange?: ((value: boolean) => any) | undefined;
    "onUpdate:checked"?: ((value: boolean) => any) | undefined;
}, {
    checked: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
