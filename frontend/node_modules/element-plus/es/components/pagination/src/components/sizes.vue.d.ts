import type { Nullable } from 'element-plus/es/utils';
declare const _default: import("vue").DefineComponent<{
    readonly pageSize: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, true, unknown, unknown>;
    readonly pageSizes: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<number[]>, () => [10, 20, 30, 40, 50, 100], unknown, unknown, unknown>;
    readonly popperClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly disabled: BooleanConstructor;
    readonly size: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "default", unknown, unknown, unknown>;
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
    innerPagesizes: import("vue").ComputedRef<number[]>;
    innerPageSize: import("vue").Ref<Nullable<number>>;
    t: import("element-plus/es/hooks").Translator;
    handleChange: (val: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "page-size-change"[], "page-size-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly pageSize: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, true, unknown, unknown>;
    readonly pageSizes: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<number[]>, () => [10, 20, 30, 40, 50, 100], unknown, unknown, unknown>;
    readonly popperClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly disabled: BooleanConstructor;
    readonly size: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "default", unknown, unknown, unknown>;
}>> & {
    "onPage-size-change"?: ((...args: any[]) => any) | undefined;
}, {
    size: string;
    disabled: boolean;
    popperClass: string;
    pageSizes: number[];
}>;
export default _default;
