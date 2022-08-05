import type { CSSProperties, Ref } from 'vue';
import type { DialogProps } from './dialog';
export declare const useDialog: (props: DialogProps, targetRef: Ref<HTMLElement | undefined>) => {
    afterEnter: () => void;
    afterLeave: () => void;
    beforeLeave: () => void;
    handleClose: () => void;
    onModalClick: () => void;
    close: () => void;
    doClose: () => void;
    closed: Ref<boolean>;
    style: import("vue").ComputedRef<CSSProperties>;
    rendered: Ref<boolean>;
    visible: Ref<boolean>;
    zIndex: Ref<number>;
};
