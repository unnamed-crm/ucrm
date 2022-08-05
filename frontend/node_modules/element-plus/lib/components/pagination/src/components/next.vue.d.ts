declare const _default: import("vue").DefineComponent<{
    readonly disabled: BooleanConstructor;
    readonly currentPage: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly pageCount: {
        readonly type: NumberConstructor;
        readonly default: 50;
    };
    readonly nextText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
}, {
    internalDisabled: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly disabled: BooleanConstructor;
    readonly currentPage: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly pageCount: {
        readonly type: NumberConstructor;
        readonly default: 50;
    };
    readonly nextText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    nextText: string;
    currentPage: number;
    pageCount: number;
}>;
export default _default;
