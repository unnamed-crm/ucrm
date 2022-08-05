import type { ExtractPropTypes } from 'vue';
export declare const tabPaneProps: {
    readonly label: import("element-plus/es/utils").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly name: import("element-plus/es/utils").BuildPropReturn<readonly [StringConstructor, NumberConstructor], "", unknown, unknown, unknown>;
    readonly closable: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly lazy: BooleanConstructor;
};
export declare type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>;
