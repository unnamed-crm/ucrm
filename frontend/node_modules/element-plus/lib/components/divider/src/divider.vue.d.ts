import type { CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    readonly direction: import("../../../utils").BuildPropReturn<StringConstructor, "horizontal", unknown, "horizontal" | "vertical", unknown>;
    readonly contentPosition: import("../../../utils").BuildPropReturn<StringConstructor, "center", unknown, "right" | "left" | "center", unknown>;
    readonly borderStyle: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<string>, "solid", unknown, unknown, unknown>;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        readonly direction: import("../../../utils").BuildPropReturn<StringConstructor, "horizontal", unknown, "horizontal" | "vertical", unknown>;
        readonly contentPosition: import("../../../utils").BuildPropReturn<StringConstructor, "center", unknown, "right" | "left" | "center", unknown>;
        readonly borderStyle: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<string>, "solid", unknown, unknown, unknown>;
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
    dividerStyle: import("vue").ComputedRef<CSSProperties>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly direction: import("../../../utils").BuildPropReturn<StringConstructor, "horizontal", unknown, "horizontal" | "vertical", unknown>;
    readonly contentPosition: import("../../../utils").BuildPropReturn<StringConstructor, "center", unknown, "right" | "left" | "center", unknown>;
    readonly borderStyle: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<string>, "solid", unknown, unknown, unknown>;
}>>, {
    direction: import("../../../utils").BuildPropType<StringConstructor, "horizontal" | "vertical", unknown>;
    borderStyle: string;
    contentPosition: import("../../../utils").BuildPropType<StringConstructor, "right" | "left" | "center", unknown>;
}>;
export default _default;
