import type { CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    readonly image: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly imageSize: NumberConstructor;
    readonly description: {
        readonly type: StringConstructor;
        readonly default: "";
    };
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
    emptyDescription: import("vue").ComputedRef<string>;
    imageStyle: import("vue").ComputedRef<CSSProperties>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly image: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly imageSize: NumberConstructor;
    readonly description: {
        readonly type: StringConstructor;
        readonly default: "";
    };
}>>, {
    description: string;
    image: string;
}>;
export default _default;
