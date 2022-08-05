import type { ExtractPropTypes } from 'vue';
export declare const tabBar: {
    readonly tabs: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<{
        uid: number;
        instance: import("vue").ShallowReactive<import("vue").ComponentInternalInstance>;
        props: {
            readonly disabled: boolean;
            readonly name: import("element-plus/es/utils").BuildPropType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
            readonly label: string;
            readonly closable: boolean;
            readonly lazy: boolean;
        };
        paneName: string | number | undefined;
        active: boolean;
        index: string | undefined;
        isClosable: boolean;
    }[]>, () => [], unknown, unknown, unknown>;
};
export declare type TabBar = ExtractPropTypes<typeof tabBar>;
