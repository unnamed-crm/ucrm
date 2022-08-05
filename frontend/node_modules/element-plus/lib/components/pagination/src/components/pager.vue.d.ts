declare const _default: import("vue").DefineComponent<{
    readonly currentPage: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly pageCount: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    readonly pagerCount: {
        readonly type: NumberConstructor;
        readonly default: 7;
    };
    readonly disabled: BooleanConstructor;
}, {
    showPrevMore: import("vue").Ref<boolean>;
    showNextMore: import("vue").Ref<boolean>;
    quickPrevHover: import("vue").Ref<boolean>;
    quickNextHover: import("vue").Ref<boolean>;
    pagers: import("vue").ComputedRef<number[]>;
    nsPager: {
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
    nsIcon: {
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
    onMouseenter: (direction: 'left' | 'right') => void;
    onPagerClick: (event: UIEvent) => void;
    onEnter: (e: UIEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly currentPage: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly pageCount: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    readonly pagerCount: {
        readonly type: NumberConstructor;
        readonly default: 7;
    };
    readonly disabled: BooleanConstructor;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    pagerCount: number;
    currentPage: number;
}>;
export default _default;
