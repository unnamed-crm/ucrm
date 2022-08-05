export declare const ElPagination: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
    readonly total: NumberConstructor;
    readonly pageSize: NumberConstructor;
    readonly defaultPageSize: NumberConstructor;
    readonly currentPage: NumberConstructor;
    readonly defaultCurrentPage: NumberConstructor;
    readonly pageCount: NumberConstructor;
    readonly pagerCount: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 7, unknown, unknown, unknown>;
    readonly layout: import("element-plus/es/utils").BuildPropReturn<StringConstructor, string, unknown, unknown, unknown>;
    readonly pageSizes: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<number[]>, () => [10, 20, 30, 40, 50, 100], unknown, unknown, unknown>;
    readonly popperClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly prevText: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly nextText: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly small: BooleanConstructor;
    readonly background: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly hideOnSinglePage: BooleanConstructor;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}> | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    'update:current-page': (val: number) => boolean;
    'update:page-size': (val: number) => boolean;
    'size-change': (val: number) => boolean;
    'current-change': (val: number) => boolean;
    'prev-click': (val: number) => boolean;
    'next-click': (val: number) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly total: NumberConstructor;
    readonly pageSize: NumberConstructor;
    readonly defaultPageSize: NumberConstructor;
    readonly currentPage: NumberConstructor;
    readonly defaultCurrentPage: NumberConstructor;
    readonly pageCount: NumberConstructor;
    readonly pagerCount: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 7, unknown, unknown, unknown>;
    readonly layout: import("element-plus/es/utils").BuildPropReturn<StringConstructor, string, unknown, unknown, unknown>;
    readonly pageSizes: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<number[]>, () => [10, 20, 30, 40, 50, 100], unknown, unknown, unknown>;
    readonly popperClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly prevText: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly nextText: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly small: BooleanConstructor;
    readonly background: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly hideOnSinglePage: BooleanConstructor;
}>> & {
    "onUpdate:current-page"?: ((val: number) => any) | undefined;
    "onUpdate:page-size"?: ((val: number) => any) | undefined;
    "onSize-change"?: ((val: number) => any) | undefined;
    "onCurrent-change"?: ((val: number) => any) | undefined;
    "onPrev-click"?: ((val: number) => any) | undefined;
    "onNext-click"?: ((val: number) => any) | undefined;
}, {
    small: boolean;
    disabled: boolean;
    popperClass: string;
    background: boolean;
    layout: string;
    pagerCount: number;
    pageSizes: number[];
    prevText: string;
    nextText: string;
    hideOnSinglePage: boolean;
}>> & Record<string, any>;
export default ElPagination;
export * from './src/pagination';
