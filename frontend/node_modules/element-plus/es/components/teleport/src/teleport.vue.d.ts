import type { StyleValue } from 'vue';
declare const _default: import("vue").DefineComponent<{
    readonly container: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<string>, "body", unknown, unknown, unknown>;
    readonly disabled: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly style: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<StyleValue>, unknown, unknown, unknown, unknown>;
    readonly zIndex: import("../../../utils").BuildPropReturn<StringConstructor, "2000", unknown, unknown, unknown>;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        readonly container: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<string>, "body", unknown, unknown, unknown>;
        readonly disabled: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly style: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<StyleValue>, unknown, unknown, unknown, unknown>;
        readonly zIndex: import("../../../utils").BuildPropReturn<StringConstructor, "2000", unknown, unknown, unknown>;
    }>> & {
        [x: string & `on${string}`]: ((...args: any[]) => any) | ((...args: unknown[]) => any) | undefined;
    }>>;
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
    containerRef: import("vue").Ref<HTMLElement | undefined>;
    containerStyle: import("vue").ComputedRef<StyleValue>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly container: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<string>, "body", unknown, unknown, unknown>;
    readonly disabled: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly style: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<StyleValue>, unknown, unknown, unknown, unknown>;
    readonly zIndex: import("../../../utils").BuildPropReturn<StringConstructor, "2000", unknown, unknown, unknown>;
}>>, {
    disabled: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    zIndex: string;
    style: StyleValue;
    container: string;
}>;
export default _default;
