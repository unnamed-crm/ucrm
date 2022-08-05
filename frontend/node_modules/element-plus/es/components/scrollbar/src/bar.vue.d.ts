declare const _default: import("vue").DefineComponent<{
    readonly always: import("../../../utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly width: import("../../../utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly height: import("../../../utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly ratioX: import("../../../utils").BuildPropReturn<NumberConstructor, 1, unknown, unknown, unknown>;
    readonly ratioY: import("../../../utils").BuildPropReturn<NumberConstructor, 1, unknown, unknown, unknown>;
}, {
    handleScroll: (wrap: HTMLDivElement) => void;
    moveX: import("vue").Ref<number>;
    moveY: import("vue").Ref<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly always: import("../../../utils").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly width: import("../../../utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly height: import("../../../utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly ratioX: import("../../../utils").BuildPropReturn<NumberConstructor, 1, unknown, unknown, unknown>;
    readonly ratioY: import("../../../utils").BuildPropReturn<NumberConstructor, 1, unknown, unknown, unknown>;
}>>, {
    height: string;
    width: string;
    always: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    ratioX: number;
    ratioY: number;
}>;
export default _default;
