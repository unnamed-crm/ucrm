import type { ExtractPropTypes } from 'vue';
import type Divider from './divider.vue';
export declare type BorderStyle = CSSStyleDeclaration['borderStyle'];
export declare const dividerProps: {
    readonly direction: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "horizontal", unknown, "horizontal" | "vertical", unknown>;
    readonly contentPosition: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "center", unknown, "right" | "left" | "center", unknown>;
    readonly borderStyle: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string>, "solid", unknown, unknown, unknown>;
};
export declare type DividerProps = ExtractPropTypes<typeof dividerProps>;
export declare type DividerInstance = InstanceType<typeof Divider>;
