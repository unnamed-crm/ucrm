declare const _default: import("vue").DefineComponent<{
    readonly variant: import("../../../utils").BuildPropReturn<StringConstructor, "text", unknown, "text" | "button" | "circle" | "caption" | "image" | "rect" | "h1" | "h3" | "p", unknown>;
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
    PictureFilled: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly variant: import("../../../utils").BuildPropReturn<StringConstructor, "text", unknown, "text" | "button" | "circle" | "caption" | "image" | "rect" | "h1" | "h3" | "p", unknown>;
}>>, {
    variant: import("../../../utils").BuildPropType<StringConstructor, "text" | "button" | "circle" | "caption" | "image" | "rect" | "h1" | "h3" | "p", unknown>;
}>;
export default _default;
