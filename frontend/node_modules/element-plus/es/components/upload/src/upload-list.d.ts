import type { ExtractPropTypes } from 'vue';
import type { UploadFile, UploadFiles } from './upload';
import type UploadList from './upload-list.vue';
export declare const uploadListProps: {
    readonly files: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<UploadFiles>, () => never[], unknown, unknown, unknown>;
    readonly disabled: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly handlePreview: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<(uploadFile: UploadFile) => void>, () => void, unknown, unknown, unknown>;
    readonly listType: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "text", unknown, "text" | "picture" | "picture-card", unknown>;
};
export declare type UploadListProps = ExtractPropTypes<typeof uploadListProps>;
export declare const uploadListEmits: {
    remove: (file: UploadFile) => boolean;
};
export declare type UploadListEmits = typeof uploadListEmits;
export declare type UploadListInstance = InstanceType<typeof UploadList>;
