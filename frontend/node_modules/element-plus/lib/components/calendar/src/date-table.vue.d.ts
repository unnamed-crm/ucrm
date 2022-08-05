import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
declare type CellType = 'next' | 'prev' | 'current';
interface Cell {
    text: number;
    type: CellType;
}
export declare const getPrevMonthLastDays: (date: Dayjs, count: number) => number[];
export declare const getMonthDays: (date: Dayjs) => number[];
declare const _default: import("vue").DefineComponent<{
    readonly selectedDay: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<dayjs.Dayjs>, unknown, unknown, unknown, unknown>;
    readonly range: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<[dayjs.Dayjs, dayjs.Dayjs]>, unknown, unknown, unknown, unknown>;
    readonly date: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<dayjs.Dayjs>, unknown, true, unknown, unknown>;
    readonly hideHeader: import("../../../utils").BuildPropReturn<BooleanConstructor, unknown, unknown, unknown, unknown>;
}, {
    isInRange: import("vue").ComputedRef<boolean>;
    weekDays: import("vue").ComputedRef<string[]>;
    rows: import("vue").ComputedRef<Cell[][]>;
    getCellClass: ({ text, type }: Cell) => string[];
    handlePickDay: ({ text, type }: Cell) => void;
    getSlotData: ({ text, type }: Cell) => {
        isSelected: boolean;
        type: string;
        day: string;
        date: Date;
    };
    nsTable: {
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
    nsDay: {
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    pick: (value: dayjs.Dayjs) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly selectedDay: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<dayjs.Dayjs>, unknown, unknown, unknown, unknown>;
    readonly range: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<[dayjs.Dayjs, dayjs.Dayjs]>, unknown, unknown, unknown, unknown>;
    readonly date: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<dayjs.Dayjs>, unknown, true, unknown, unknown>;
    readonly hideHeader: import("../../../utils").BuildPropReturn<BooleanConstructor, unknown, unknown, unknown, unknown>;
}>> & {
    onPick?: ((value: dayjs.Dayjs) => any) | undefined;
}, {
    range: [dayjs.Dayjs, dayjs.Dayjs];
    selectedDay: dayjs.Dayjs;
    hideHeader: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
