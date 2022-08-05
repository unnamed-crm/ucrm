import type { MenuItemRegistered, MenuProvider } from './types';
declare const _default: import("vue").DefineComponent<{
    readonly index: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | null>, null, unknown, unknown, unknown>;
    readonly route: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("vue-router").RouteLocationRaw>, unknown, unknown, unknown, unknown>;
    readonly disabled: BooleanConstructor;
}, {
    Effect: {
        LIGHT: string;
        DARK: string;
    };
    parentMenu: import("vue").ComputedRef<import("vue").ComponentInternalInstance>;
    rootMenu: MenuProvider;
    paddingStyle: import("vue").ComputedRef<import("vue").CSSProperties>;
    active: import("vue").ComputedRef<boolean>;
    handleClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (item: MenuItemRegistered) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly index: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | null>, null, unknown, unknown, unknown>;
    readonly route: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("vue-router").RouteLocationRaw>, unknown, unknown, unknown, unknown>;
    readonly disabled: BooleanConstructor;
}>> & {
    onClick?: ((item: MenuItemRegistered) => any) | undefined;
}, {
    disabled: boolean;
    index: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | null>, unknown, unknown>;
    route: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<import("vue-router").RouteLocationRaw>, unknown, unknown>;
}>;
export default _default;
