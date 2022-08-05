import type { CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    readonly customClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly center: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly dangerouslyUseHTMLString: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly duration: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 3000, unknown, unknown, unknown>;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, "", unknown, unknown, unknown>;
    readonly id: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly message: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | (() => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>)>, "", unknown, unknown, unknown>;
    readonly onClose: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<() => void>, unknown, false, unknown, unknown>;
    readonly showClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly type: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "info", unknown, "success" | "warning" | "info" | "error", unknown>;
    readonly offset: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 20, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly grouping: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly repeatNum: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 1, unknown, unknown, unknown>;
}, {
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
    typeClass: import("vue").ComputedRef<{
        [x: string]: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    }>;
    iconComponent: import("vue").ComputedRef<import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown>>;
    customStyle: import("vue").ComputedRef<CSSProperties>;
    visible: import("vue").Ref<boolean>;
    badgeType: import("vue").Ref<import("element-plus/es/utils").BuildPropType<StringConstructor, "primary" | "success" | "warning" | "info" | "danger", unknown>>;
    close: () => void;
    clearTimer: () => void;
    startTimer: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    destroy: () => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly customClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly center: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly dangerouslyUseHTMLString: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly duration: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 3000, unknown, unknown, unknown>;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, "", unknown, unknown, unknown>;
    readonly id: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly message: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | (() => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>)>, "", unknown, unknown, unknown>;
    readonly onClose: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<() => void>, unknown, false, unknown, unknown>;
    readonly showClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly type: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "info", unknown, "success" | "warning" | "info" | "error", unknown>;
    readonly offset: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 20, unknown, unknown, unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly grouping: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly repeatNum: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 1, unknown, unknown, unknown>;
}>> & {
    onDestroy?: (() => any) | undefined;
}, {
    type: import("element-plus/es/utils").BuildPropType<StringConstructor, "success" | "warning" | "info" | "error", unknown>;
    icon: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>, unknown, unknown>;
    message: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | (() => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>)>, unknown, unknown>;
    zIndex: number;
    offset: number;
    center: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    onClose: () => void;
    id: string;
    showClose: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    customClass: string;
    duration: number;
    dangerouslyUseHTMLString: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    grouping: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    repeatNum: number;
}>;
export default _default;
