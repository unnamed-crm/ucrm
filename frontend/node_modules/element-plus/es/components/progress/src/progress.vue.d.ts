import type { CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    readonly type: import("../../../utils").BuildPropReturn<StringConstructor, "line", unknown, "circle" | "line" | "dashboard", unknown>;
    readonly percentage: import("../../../utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly status: import("../../../utils").BuildPropReturn<StringConstructor, "", unknown, "" | "success" | "warning" | "exception", unknown>;
    readonly indeterminate: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly duration: import("../../../utils").BuildPropReturn<NumberConstructor, 3, unknown, unknown, unknown>;
    readonly strokeWidth: import("../../../utils").BuildPropReturn<NumberConstructor, 6, unknown, unknown, unknown>;
    readonly strokeLinecap: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<"round" | "inherit" | "butt" | "square">, "round", unknown, unknown, unknown>;
    readonly textInside: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly width: import("../../../utils").BuildPropReturn<NumberConstructor, 126, unknown, unknown, unknown>;
    readonly showText: import("../../../utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly color: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<string | ((percentage: number) => string) | {
        color: string;
        percentage: number;
    }[]>, "", unknown, unknown, unknown>;
    readonly format: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<(percentage: number) => string>, (percentage: number) => string, unknown, unknown, unknown>;
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
    barStyle: import("vue").ComputedRef<CSSProperties>;
    relativeStrokeWidth: import("vue").ComputedRef<string>;
    radius: import("vue").ComputedRef<number>;
    trackPath: import("vue").ComputedRef<string>;
    perimeter: import("vue").ComputedRef<number>;
    rate: import("vue").ComputedRef<1 | 0.75>;
    strokeDashoffset: import("vue").ComputedRef<string>;
    trailPathStyle: import("vue").ComputedRef<CSSProperties>;
    circlePathStyle: import("vue").ComputedRef<CSSProperties>;
    stroke: import("vue").ComputedRef<string>;
    statusIcon: import("vue").ComputedRef<import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>>;
    progressTextSize: import("vue").ComputedRef<number>;
    content: import("vue").ComputedRef<string>;
    slotData: import("vue").ComputedRef<{
        percentage: number;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly type: import("../../../utils").BuildPropReturn<StringConstructor, "line", unknown, "circle" | "line" | "dashboard", unknown>;
    readonly percentage: import("../../../utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly status: import("../../../utils").BuildPropReturn<StringConstructor, "", unknown, "" | "success" | "warning" | "exception", unknown>;
    readonly indeterminate: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly duration: import("../../../utils").BuildPropReturn<NumberConstructor, 3, unknown, unknown, unknown>;
    readonly strokeWidth: import("../../../utils").BuildPropReturn<NumberConstructor, 6, unknown, unknown, unknown>;
    readonly strokeLinecap: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<"round" | "inherit" | "butt" | "square">, "round", unknown, unknown, unknown>;
    readonly textInside: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly width: import("../../../utils").BuildPropReturn<NumberConstructor, 126, unknown, unknown, unknown>;
    readonly showText: import("../../../utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly color: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<string | ((percentage: number) => string) | {
        color: string;
        percentage: number;
    }[]>, "", unknown, unknown, unknown>;
    readonly format: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<(percentage: number) => string>, (percentage: number) => string, unknown, unknown, unknown>;
}>>, {
    type: import("../../../utils").BuildPropType<StringConstructor, "circle" | "line" | "dashboard", unknown>;
    color: import("../../../utils").BuildPropType<import("../../../utils").PropWrapper<string | ((percentage: number) => string) | {
        color: string;
        percentage: number;
    }[]>, unknown, unknown>;
    width: number;
    strokeLinecap: import("../../../utils").BuildPropType<import("../../../utils").PropWrapper<"round" | "inherit" | "butt" | "square">, unknown, unknown>;
    strokeWidth: number;
    indeterminate: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    format: (percentage: number) => string;
    percentage: number;
    status: import("../../../utils").BuildPropType<StringConstructor, "" | "success" | "warning" | "exception", unknown>;
    duration: number;
    textInside: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    showText: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
