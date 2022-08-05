import type { ExtractPropTypes } from 'vue';
import type PageHeader from './page-header.vue';
export declare const pageHeaderProps: {
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, () => import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{}>>, {}>, unknown, unknown, unknown>;
    readonly title: StringConstructor;
    readonly content: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
};
export declare type PageHeaderProps = ExtractPropTypes<typeof pageHeaderProps>;
export declare const pageHeaderEmits: {
    back: () => boolean;
};
export declare type PageHeaderEmits = typeof pageHeaderEmits;
export declare type PageHeaderInstance = InstanceType<typeof PageHeader>;
