export declare const ElTeleport: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
    readonly container: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string>, "body", unknown, unknown, unknown>;
    readonly disabled: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly style: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("vue").StyleValue>, unknown, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "2000", unknown, unknown, unknown>;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        readonly container: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string>, "body", unknown, unknown, unknown>;
        readonly disabled: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly style: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("vue").StyleValue>, unknown, unknown, unknown, unknown>;
        readonly zIndex: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "2000", unknown, unknown, unknown>;
    }>> & {
        [x: string & `on${string}`]: ((...args: any[]) => any) | ((...args: unknown[]) => any) | undefined;
    }>>;
    ns: {
        namespace: import("vue").ComputedRef<string>;
        b: (blockSuffix?: string) => string;
        e: (element?: string | undefined) => string;
        m: (modifier?: string | undefined) => string;
        be: (blockSuffix?: string | undefined, element?: string | undefined) => string;
        em: (element?: string | undefined, modifier?: string | undefined) => string;
        bm: (blockSuffix?: string | undefined, modifier?: string | undefined) => string;
        bem: (blockSuffix?: string | undefined, element?: string | undefined, modifier?: string | undefined) => string;
        is: {
            (name: string, state: boolean | undefined): string;
            (name: string): string;
        };
    };
    containerRef: import("vue").Ref<HTMLElement | undefined>;
    containerStyle: import("vue").ComputedRef<import("vue").StyleValue>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly container: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string>, "body", unknown, unknown, unknown>;
    readonly disabled: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly style: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("vue").StyleValue>, unknown, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "2000", unknown, unknown, unknown>;
}>>, {
    disabled: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    zIndex: string;
    style: import("vue").StyleValue;
    container: string;
}>> & Record<string, any>;
export default ElTeleport;
export * from './src/teleport';
