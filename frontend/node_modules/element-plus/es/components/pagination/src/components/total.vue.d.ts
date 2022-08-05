import type { ExtractPropTypes } from 'vue';
declare const paginationTotalProps: {
    readonly total: {
        readonly type: NumberConstructor;
        readonly default: 1000;
    };
};
export declare type PaginationTotalProps = ExtractPropTypes<typeof paginationTotalProps>;
declare const _default: import("vue").DefineComponent<{
    readonly total: {
        readonly type: NumberConstructor;
        readonly default: 1000;
    };
}, {
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
    disabled: import("vue").ComputedRef<boolean> | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly total: {
        readonly type: NumberConstructor;
        readonly default: 1000;
    };
}>>, {
    total: number;
}>;
export default _default;
