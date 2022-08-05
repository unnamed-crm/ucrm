import type { ExtractPropTypes } from 'vue';
import type Link from './link.vue';
export declare const linkProps: {
    readonly type: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "default", unknown, "default" | "primary" | "success" | "warning" | "info" | "danger", unknown>;
    readonly underline: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly disabled: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly href: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, "", unknown, unknown, unknown>;
};
export declare type LinkProps = ExtractPropTypes<typeof linkProps>;
export declare const linkEmits: {
    click: (evt: MouseEvent) => boolean;
};
export declare type LinkEmits = typeof linkEmits;
export declare type LinkInstance = InstanceType<typeof Link>;
