import type { ExtractPropTypes, StyleValue } from 'vue';
import type Teleport from './teleport.vue';
export declare const teleportProps: {
    readonly container: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string>, "body", unknown, unknown, unknown>;
    readonly disabled: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly style: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<StyleValue>, unknown, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "2000", unknown, unknown, unknown>;
};
export declare type TeleportProps = ExtractPropTypes<typeof teleportProps>;
export declare type TeleportInstance = InstanceType<typeof Teleport>;
