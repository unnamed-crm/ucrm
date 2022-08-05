import type { ExtractPropTypes } from 'vue';
export declare const rowProps: {
    readonly tag: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "div", unknown, unknown, unknown>;
    readonly gutter: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly justify: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "start", unknown, "center" | "space-around" | "space-between" | "space-evenly" | "end" | "start", unknown>;
    readonly align: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "top", unknown, "top" | "bottom" | "middle", unknown>;
};
export declare type RowProps = ExtractPropTypes<typeof rowProps>;
declare const Row: import("vue").DefineComponent<{
    readonly tag: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "div", unknown, unknown, unknown>;
    readonly gutter: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly justify: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "start", unknown, "center" | "space-around" | "space-between" | "space-evenly" | "end" | "start", unknown>;
    readonly align: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "top", unknown, "top" | "bottom" | "middle", unknown>;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly tag: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "div", unknown, unknown, unknown>;
    readonly gutter: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly justify: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "start", unknown, "center" | "space-around" | "space-between" | "space-evenly" | "end" | "start", unknown>;
    readonly align: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "top", unknown, "top" | "bottom" | "middle", unknown>;
}>>, {
    justify: import("element-plus/es/utils").BuildPropType<StringConstructor, "center" | "space-around" | "space-between" | "space-evenly" | "end" | "start", unknown>;
    tag: string;
    align: import("element-plus/es/utils").BuildPropType<StringConstructor, "top" | "bottom" | "middle", unknown>;
    gutter: number;
}>;
export default Row;
export declare type RowInstance = InstanceType<typeof Row>;
