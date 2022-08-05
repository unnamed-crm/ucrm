import type { ExtractPropTypes } from 'vue';
import type { CollapseActiveName } from './collapse';
import type CollapseItem from './collapse-item.vue';
export declare const collapseItemProps: {
    readonly title: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly name: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<CollapseActiveName>, () => number, unknown, unknown, unknown>;
    readonly disabled: BooleanConstructor;
};
export declare type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>;
export declare type CollapseItemInstance = InstanceType<typeof CollapseItem>;
