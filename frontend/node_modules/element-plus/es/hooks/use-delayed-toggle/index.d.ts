import type { ToRefs, ExtractPropTypes } from 'vue';
export declare const useDelayedToggleProps: {
    readonly showAfter: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly hideAfter: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 200, unknown, unknown, unknown>;
};
export declare type UseDelayedToggleProps = {
    open: () => void;
    close: () => void;
} & ToRefs<ExtractPropTypes<typeof useDelayedToggleProps>>;
export declare const useDelayedToggle: ({ showAfter, hideAfter, open, close, }: UseDelayedToggleProps) => {
    onOpen: () => void;
    onClose: () => void;
};
