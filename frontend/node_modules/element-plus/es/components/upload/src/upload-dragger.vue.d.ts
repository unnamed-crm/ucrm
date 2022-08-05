declare const _default: import("vue").DefineComponent<{
    readonly disabled: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
}, {
    COMPONENT_NAME: string;
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        readonly disabled: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    }>> & {
        onFile?: ((file: File[]) => any) | undefined;
    }>>;
    emit: (event: "file", file: File[]) => void;
    uploaderContext: import("element-plus/es/tokens").UploadContext;
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
    dragover: import("vue").Ref<boolean>;
    onDrop: (e: DragEvent) => void;
    onDragover: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    file: (file: File[]) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly disabled: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
}>> & {
    onFile?: ((file: File[]) => any) | undefined;
}, {
    disabled: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
