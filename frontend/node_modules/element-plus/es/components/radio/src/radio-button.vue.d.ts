import type { CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    readonly name: import("../../../utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly size: import("../../../utils").BuildPropReturn<StringConstructor, never, false, "default" | "small" | "large", never>;
    readonly disabled: BooleanConstructor;
    readonly label: import("../../../utils").BuildPropReturn<(BooleanConstructor | StringConstructor | NumberConstructor)[], string, unknown, unknown, unknown>;
}, {
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
    isGroup: import("vue").ComputedRef<boolean>;
    size: import("vue").ComputedRef<"default" | "small" | "large">;
    disabled: import("vue").ComputedRef<boolean>;
    tabIndex: import("vue").ComputedRef<0 | -1>;
    modelValue: import("vue").WritableComputedRef<import("../../../utils").BuildPropType<readonly [StringConstructor, NumberConstructor, BooleanConstructor], unknown, unknown>>;
    focus: import("vue").Ref<boolean>;
    activeStyle: import("vue").ComputedRef<CSSProperties>;
    radioRef: import("vue").Ref<HTMLInputElement | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly name: import("../../../utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly size: import("../../../utils").BuildPropReturn<StringConstructor, never, false, "default" | "small" | "large", never>;
    readonly disabled: BooleanConstructor;
    readonly label: import("../../../utils").BuildPropReturn<(BooleanConstructor | StringConstructor | NumberConstructor)[], string, unknown, unknown, unknown>;
}>>, {
    size: import("../../../utils").BuildPropType<StringConstructor, "default" | "small" | "large", never>;
    disabled: boolean;
    name: string;
    label: import("../../../utils").BuildPropType<(BooleanConstructor | StringConstructor | NumberConstructor)[], unknown, unknown>;
}>;
export default _default;
