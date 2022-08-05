import type { ExtractPropTypes } from 'vue';
export declare const imageProps: {
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
};
export declare type ImageProps = ExtractPropTypes<typeof imageProps>;
export declare const imageEmits: {
    error: (evt: Event) => boolean;
    switch: (val: number) => boolean;
    close: () => boolean;
};
export declare type ImageEmits = typeof imageEmits;
