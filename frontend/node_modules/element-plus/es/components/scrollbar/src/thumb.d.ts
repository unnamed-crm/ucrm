import type { ExtractPropTypes } from 'vue';
export declare const thumbProps: {
    readonly vertical: BooleanConstructor;
    readonly size: StringConstructor;
    readonly move: NumberConstructor;
    readonly ratio: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, true, unknown, unknown>;
    readonly always: BooleanConstructor;
};
export declare type ThumbProps = ExtractPropTypes<typeof thumbProps>;
