import type { CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
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
}, {
    bar$: import("vue").Ref<HTMLDivElement | undefined>;
    rootTabs: import("element-plus/es/tokens").TabsRootContext;
    barStyle: import("vue").Ref<any>;
    update: () => CSSProperties;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>>, {
    tabs: {
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
    }[];
}>;
export default _default;
