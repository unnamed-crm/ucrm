import type { CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    readonly customClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly dangerouslyUseHTMLString: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly duration: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 4500, unknown, unknown, unknown>;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | Comment>, "", unknown, unknown, unknown>;
    readonly id: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly message: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>, "", unknown, unknown, unknown>;
    readonly offset: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly onClick: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<() => void>, () => undefined, unknown, unknown, unknown>;
    readonly onClose: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<() => void>, unknown, true, unknown, unknown>;
    readonly position: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "top-right", unknown, "top-right" | "top-left" | "bottom-right" | "bottom-left", unknown>;
    readonly showClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly title: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly type: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, "" | "success" | "warning" | "info" | "error", unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
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
    horizontalClass: import("vue").ComputedRef<"right" | "left">;
    typeClass: import("vue").ComputedRef<string>;
    iconComponent: import("vue").ComputedRef<any>;
    positionStyle: import("vue").ComputedRef<CSSProperties>;
    visible: import("vue").Ref<boolean>;
    close: () => void;
    clearTimer: () => void;
    startTimer: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    destroy: () => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly customClass: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly dangerouslyUseHTMLString: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly duration: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 4500, unknown, unknown, unknown>;
    readonly icon: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | Comment>, "", unknown, unknown, unknown>;
    readonly id: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly message: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>, "", unknown, unknown, unknown>;
    readonly offset: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly onClick: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<() => void>, () => undefined, unknown, unknown, unknown>;
    readonly onClose: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<() => void>, unknown, true, unknown, unknown>;
    readonly position: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "top-right", unknown, "top-right" | "top-left" | "bottom-right" | "bottom-left", unknown>;
    readonly showClose: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly title: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly type: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, "" | "success" | "warning" | "info" | "error", unknown>;
    readonly zIndex: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
}>> & {
    onDestroy?: (() => any) | undefined;
}, {
    type: import("element-plus/es/utils").BuildPropType<StringConstructor, "" | "success" | "warning" | "info" | "error", unknown>;
    icon: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | Comment>, unknown, unknown>;
    message: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>, unknown, unknown>;
    zIndex: number;
    offset: number;
    position: import("element-plus/es/utils").BuildPropType<StringConstructor, "top-right" | "top-left" | "bottom-right" | "bottom-left", unknown>;
    title: string;
    id: string;
    onClick: () => void;
    showClose: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    customClass: string;
    duration: number;
    dangerouslyUseHTMLString: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
