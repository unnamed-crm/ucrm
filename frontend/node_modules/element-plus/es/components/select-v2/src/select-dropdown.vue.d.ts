import type { Option } from './select.types';
declare const _default: import("vue").DefineComponent<{
    data: ArrayConstructor;
    hoveringIndex: NumberConstructor;
    width: NumberConstructor;
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
    select: any;
    listProps: import("vue").ComputedRef<{
        itemSize: any;
        estimatedSize?: undefined;
    } | {
        estimatedSize: any;
        itemSize: (idx: number) => number;
    }>;
    listRef: import("vue").Ref<null>;
    isSized: import("vue").ComputedRef<boolean>;
    isItemDisabled: (modelValue: any[] | any, selected: boolean) => any;
    isItemHovering: (target: number) => boolean;
    isItemSelected: (modelValue: any[] | any, target: Option) => boolean;
    scrollToItem: (index: number) => void;
    resetScrollTop: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    data: ArrayConstructor;
    hoveringIndex: NumberConstructor;
    width: NumberConstructor;
}>>, {}>;
export default _default;
