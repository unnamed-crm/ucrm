import type { ExtractPropTypes } from 'vue';
import type { TabsPaneContext } from 'element-plus/es/tokens';
export interface Scrollable {
    next?: boolean;
    prev?: number;
}
export declare const tabNavProps: {
    readonly panes: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<{
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
    readonly currentName: import("element-plus/es/utils").BuildPropReturn<readonly [StringConstructor, NumberConstructor], "", unknown, unknown, unknown>;
    readonly editable: BooleanConstructor;
    readonly onTabClick: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(tab: TabsPaneContext, tabName: string | number, ev: Event) => void>, () => void, unknown, unknown, unknown>;
    readonly onTabRemove: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(tab: TabsPaneContext, ev: Event) => void>, () => void, unknown, unknown, unknown>;
    readonly type: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, "" | "card" | "border-card", unknown>;
    readonly stretch: BooleanConstructor;
};
export declare type TabNavProps = ExtractPropTypes<typeof tabNavProps>;
declare const _default: import("vue").DefineComponent<{
    readonly panes: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<{
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
    readonly currentName: import("element-plus/es/utils").BuildPropReturn<readonly [StringConstructor, NumberConstructor], "", unknown, unknown, unknown>;
    readonly editable: BooleanConstructor;
    readonly onTabClick: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(tab: {
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
    }, tabName: string | number, ev: Event) => void>, () => void, unknown, unknown, unknown>;
    readonly onTabRemove: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(tab: {
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
    }, ev: Event) => void>, () => void, unknown, unknown, unknown>;
    readonly type: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, "" | "card" | "border-card", unknown>;
    readonly stretch: BooleanConstructor;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly panes: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<{
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
    readonly currentName: import("element-plus/es/utils").BuildPropReturn<readonly [StringConstructor, NumberConstructor], "", unknown, unknown, unknown>;
    readonly editable: BooleanConstructor;
    readonly onTabClick: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(tab: {
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
    }, tabName: string | number, ev: Event) => void>, () => void, unknown, unknown, unknown>;
    readonly onTabRemove: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(tab: {
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
    }, ev: Event) => void>, () => void, unknown, unknown, unknown>;
    readonly type: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, "" | "card" | "border-card", unknown>;
    readonly stretch: BooleanConstructor;
}>>, {
    type: import("element-plus/es/utils").BuildPropType<StringConstructor, "" | "card" | "border-card", unknown>;
    editable: boolean;
    stretch: boolean;
    panes: {
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
    currentName: import("element-plus/es/utils").BuildPropType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
    onTabClick: (tab: {
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
    }, tabName: string | number, ev: Event) => void;
    onTabRemove: (tab: {
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
    }, ev: Event) => void;
}>;
export default _default;
