export declare const ElDialog: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
    readonly appendToBody: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly beforeClose: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("./src/dialog").DialogBeforeCloseFn>, unknown, unknown, unknown, unknown>;
    readonly destroyOnClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly closeOnClickModal: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly closeOnPressEscape: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly lockScroll: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly modal: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly openDelay: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly closeDelay: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly top: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly modelValue: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, unknown, true, unknown, unknown>;
    readonly modalClass: StringConstructor;
    readonly width: import("element-plus/es/utils").BuildPropReturn<readonly [StringConstructor, NumberConstructor], unknown, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, unknown, unknown, unknown>;
    readonly trapFocus: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly center: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly closeIcon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, "", unknown, unknown, unknown>;
    readonly customClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly draggable: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly fullscreen: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly showClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly title: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        readonly appendToBody: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly beforeClose: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("./src/dialog").DialogBeforeCloseFn>, unknown, unknown, unknown, unknown>;
        readonly destroyOnClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly closeOnClickModal: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
        readonly closeOnPressEscape: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
        readonly lockScroll: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
        readonly modal: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
        readonly openDelay: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
        readonly closeDelay: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
        readonly top: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
        readonly modelValue: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, unknown, true, unknown, unknown>;
        readonly modalClass: StringConstructor;
        readonly width: import("element-plus/es/utils").BuildPropReturn<readonly [StringConstructor, NumberConstructor], unknown, unknown, unknown, unknown>;
        readonly zIndex: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, unknown, unknown, unknown>;
        readonly trapFocus: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly center: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly closeIcon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, "", unknown, unknown, unknown>;
        readonly customClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
        readonly draggable: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly fullscreen: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly showClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
        readonly title: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    }>> & {
        onClose?: (() => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        onOpen?: (() => any) | undefined;
        onOpened?: (() => any) | undefined;
        onClosed?: (() => any) | undefined;
        onOpenAutoFocus?: (() => any) | undefined;
        onCloseAutoFocus?: (() => any) | undefined;
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
    dialogRef: import("vue").Ref<HTMLElement | undefined>;
    headerRef: import("vue").Ref<HTMLElement | undefined>;
    visible: import("vue").Ref<boolean>;
    style: import("vue").ComputedRef<import("vue").CSSProperties>;
    rendered: import("vue").Ref<boolean>;
    zIndex: import("vue").Ref<number>;
    afterEnter: () => void;
    afterLeave: () => void;
    beforeLeave: () => void;
    handleClose: () => void;
    onModalClick: () => void;
    overlayEvent: {
        onClick: (e: MouseEvent) => void;
        onMousedown: (e: MouseEvent) => void;
        onMouseup: (e: MouseEvent) => void;
    };
    draggable: import("vue").ComputedRef<boolean>;
    ElOverlay: import("vue").DefineComponent<{
        readonly mask: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
        readonly customMaskEvent: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly overlayClass: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | string[] | Record<string, boolean>>, unknown, unknown, unknown, unknown>;
        readonly zIndex: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("csstype").ZIndexProperty>, unknown, unknown, unknown, unknown>;
    }, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        click: (evt: MouseEvent) => boolean;
    }, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        readonly mask: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
        readonly customMaskEvent: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly overlayClass: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | string[] | Record<string, boolean>>, unknown, unknown, unknown, unknown>;
        readonly zIndex: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("csstype").ZIndexProperty>, unknown, unknown, unknown, unknown>;
    }>> & {
        onClick?: ((evt: MouseEvent) => any) | undefined;
    }, {
        zIndex: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<import("csstype").ZIndexProperty>, unknown, unknown>;
        mask: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
        customMaskEvent: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
        overlayClass: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | string[] | Record<string, boolean>>, unknown, unknown>;
    }>;
    ElDialogContent: import("vue").DefineComponent<{
        readonly center: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly closeIcon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, "", unknown, unknown, unknown>;
        readonly customClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
        readonly draggable: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly fullscreen: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly showClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
        readonly title: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    }, {
        Close: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
        dialogRef: import("vue").Ref<HTMLElement | undefined>;
        headerRef: import("vue").Ref<HTMLElement | undefined>;
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
        style: import("vue").ComputedRef<import("vue").CSSProperties>;
        ElIcon: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
            readonly size: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | number>, unknown, unknown, unknown, unknown>;
            readonly color: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
        }, {
            props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
                readonly size: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | number>, unknown, unknown, unknown, unknown>;
                readonly color: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
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
            style: import("vue").ComputedRef<import("vue").CSSProperties>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            readonly size: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | number>, unknown, unknown, unknown, unknown>;
            readonly color: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
        }>>, {
            size: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | number>, unknown, unknown>;
            color: string;
        }>> & Record<string, any>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        close: () => boolean;
    }, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        readonly center: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly closeIcon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, "", unknown, unknown, unknown>;
        readonly customClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
        readonly draggable: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly fullscreen: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
        readonly showClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
        readonly title: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    }>> & {
        onClose?: (() => any) | undefined;
    }, {
        title: string;
        center: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
        draggable: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
        showClose: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
        closeIcon: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown>;
        customClass: string;
        fullscreen: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    open: () => boolean;
    opened: () => boolean;
    close: () => boolean;
    closed: () => boolean;
    "update:modelValue": (value: boolean) => boolean;
    openAutoFocus: () => boolean;
    closeAutoFocus: () => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly appendToBody: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly beforeClose: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("./src/dialog").DialogBeforeCloseFn>, unknown, unknown, unknown, unknown>;
    readonly destroyOnClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly closeOnClickModal: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly closeOnPressEscape: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly lockScroll: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly modal: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly openDelay: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly closeDelay: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly top: import("element-plus/es/utils").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly modelValue: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, unknown, true, unknown, unknown>;
    readonly modalClass: StringConstructor;
    readonly width: import("element-plus/es/utils").BuildPropReturn<readonly [StringConstructor, NumberConstructor], unknown, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, unknown, unknown, unknown, unknown>;
    readonly trapFocus: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly center: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly closeIcon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, "", unknown, unknown, unknown>;
    readonly customClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly draggable: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly fullscreen: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly showClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly title: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
}>> & {
    onClose?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onOpen?: (() => any) | undefined;
    onOpened?: (() => any) | undefined;
    onClosed?: (() => any) | undefined;
    onOpenAutoFocus?: (() => any) | undefined;
    onCloseAutoFocus?: (() => any) | undefined;
}, {
    zIndex: number;
    top: string;
    width: import("element-plus/es/utils").BuildPropType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
    title: string;
    center: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    draggable: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    openDelay: number;
    showClose: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    closeIcon: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown>;
    customClass: string;
    fullscreen: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    appendToBody: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    beforeClose: import("./src/dialog").DialogBeforeCloseFn;
    destroyOnClose: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    closeOnClickModal: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    closeOnPressEscape: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    lockScroll: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    modal: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    closeDelay: number;
    trapFocus: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
}>> & Record<string, any>;
export default ElDialog;
export * from './src/use-dialog';
export * from './src/dialog';
