declare const _default: import("vue").DefineComponent<{
    readonly disabled: BooleanConstructor;
    readonly trigger: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<"click" | "focus" | "hover" | "contextmenu" | ("click" | "focus" | "hover" | "contextmenu")[]>, "hover", unknown, unknown, unknown>;
    readonly virtualRef: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("element-plus/es/components/popper").Measurable>, unknown, unknown, unknown, unknown>;
    readonly virtualTriggering: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, unknown, unknown, unknown, unknown>;
}, {
    onBlur: (event: Event) => void;
    onContextMenu: (event: Event) => void;
    onFocus: (event: Event) => void;
    onMouseenter: (event: Event) => void;
    onMouseleave: (event: Event) => void;
    onClick: (event: Event) => void;
    onKeydown: (event: KeyboardEvent) => void;
    open: import("vue").Ref<boolean>;
    id: import("vue").Ref<string>;
    triggerRef: import("vue").Ref<{
        forwardRef: HTMLElement;
    } | null>;
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly disabled: BooleanConstructor;
    readonly trigger: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<"click" | "focus" | "hover" | "contextmenu" | ("click" | "focus" | "hover" | "contextmenu")[]>, "hover", unknown, unknown, unknown>;
    readonly virtualRef: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("element-plus/es/components/popper").Measurable>, unknown, unknown, unknown, unknown>;
    readonly virtualTriggering: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, unknown, unknown, unknown, unknown>;
}>>, {
    disabled: boolean;
    trigger: import("element-plus/es/utils").BuildPropType<import("element-plus/es/utils").PropWrapper<"click" | "focus" | "hover" | "contextmenu" | ("click" | "focus" | "hover" | "contextmenu")[]>, unknown, unknown>;
    virtualRef: import("element-plus/es/components/popper").Measurable;
    virtualTriggering: import("element-plus/es/utils").BuildPropType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
