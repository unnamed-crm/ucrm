import type { ExtractPropTypes } from 'vue';
import type Icon from './icon.vue';
export declare const iconProps: {
    readonly size: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | number>, unknown, unknown, unknown, unknown>;
    readonly color: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
};
export declare type IconProps = ExtractPropTypes<typeof iconProps>;
export declare type IconInstance = InstanceType<typeof Icon>;
