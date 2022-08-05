export declare const ElImage: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
    readonly appendToBody: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, undefined, unknown, unknown, unknown>;
    readonly hideOnClickModal: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly src: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly fit: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, "" | "fill" | "none" | "contain" | "cover" | "scale-down", unknown>;
    readonly lazy: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly scrollContainer: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | HTMLElement | undefined>, unknown, unknown, unknown, unknown>;
    readonly previewSrcList: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string[]>, () => [], unknown, unknown, unknown>;
    readonly previewTeleported: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, unknown, unknown, unknown>;
    readonly initialIndex: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
}, {
    attrs: import("vue").ComputedRef<Record<string, unknown>>;
    loading: import("vue").Ref<boolean>;
    hasLoadError: import("vue").Ref<boolean>;
    showViewer: import("vue").Ref<boolean>;
    containerStyle: import("vue").ComputedRef<import("vue").StyleValue>;
    imageStyle: import("vue").ComputedRef<import("vue").CSSProperties>;
    preview: import("vue").ComputedRef<boolean>;
    imageIndex: import("vue").ComputedRef<number>;
    container: import("vue").Ref<HTMLElement | undefined>;
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
    teleported: import("vue").ComputedRef<import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>>;
    clickHandler: () => void;
    closeViewer: () => void;
    switchViewer: (val: number) => void;
    t: import("../..").Translator;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (evt: Event) => boolean;
    switch: (val: number) => boolean;
    close: () => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly appendToBody: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, undefined, unknown, unknown, unknown>;
    readonly hideOnClickModal: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly src: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly fit: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, "" | "fill" | "none" | "contain" | "cover" | "scale-down", unknown>;
    readonly lazy: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly scrollContainer: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | HTMLElement | undefined>, unknown, unknown, unknown, unknown>;
    readonly previewSrcList: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string[]>, () => [], unknown, unknown, unknown>;
    readonly previewTeleported: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, unknown, unknown, unknown>;
    readonly initialIndex: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
}>> & {
    onClose?: (() => any) | undefined;
    onError?: ((evt: Event) => any) | undefined;
    onSwitch?: ((val: number) => any) | undefined;
}, {
    zIndex: number;
    lazy: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    src: string;
    fit: import("element-plus/es/utils").BuildPropType<StringConstructor, "" | "fill" | "none" | "contain" | "cover" | "scale-down", unknown>;
    initialIndex: number;
    appendToBody: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    hideOnClickModal: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    scrollContainer: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | HTMLElement | undefined>, unknown, unknown>;
    previewSrcList: string[];
    previewTeleported: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
}>> & Record<string, any>;
export default ElImage;
export * from './src/image';
