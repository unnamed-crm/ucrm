import type { ExtractPropTypes } from 'vue';
import type UploadDragger from './upload-dragger.vue';
export declare const uploadDraggerProps: {
    readonly disabled: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
};
export declare type UploadDraggerProps = ExtractPropTypes<typeof uploadDraggerProps>;
export declare const uploadDraggerEmits: {
    file: (file: File[]) => boolean;
};
export declare type UploadDraggerEmits = typeof uploadDraggerEmits;
export declare type UploadDraggerInstance = InstanceType<typeof UploadDragger>;
