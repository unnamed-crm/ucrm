declare const _default: import("vue").DefineComponent<{
    readonly node: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<import("./types").TreeNode>, () => import("../../../utils").Mutable<{
        readonly key: -1;
        readonly level: -1;
        readonly data: {};
    }>, unknown, unknown, unknown>;
    readonly expanded: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly checked: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly indeterminate: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly showCheckbox: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly disabled: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly current: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly hiddenExpandIcon: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
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
    indent: import("vue").ComputedRef<number>;
    icon: import("vue").ComputedRef<string>;
    handleClick: (e: MouseEvent) => void;
    handleExpandIconClick: () => void;
    handleCheckChange: (value: boolean) => void;
    handleContextMenu: (event: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (node: import("./types").TreeNode, e: MouseEvent) => boolean;
    toggle: (node: import("./types").TreeNode) => boolean;
    check: (node: import("./types").TreeNode, checked: boolean) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly node: import("../../../utils").BuildPropReturn<import("../../../utils").PropWrapper<import("./types").TreeNode>, () => import("../../../utils").Mutable<{
        readonly key: -1;
        readonly level: -1;
        readonly data: {};
    }>, unknown, unknown, unknown>;
    readonly expanded: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly checked: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly indeterminate: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly showCheckbox: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly disabled: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly current: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly hiddenExpandIcon: import("../../../utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
}>> & {
    onClick?: ((node: import("./types").TreeNode, e: MouseEvent) => any) | undefined;
    onToggle?: ((node: import("./types").TreeNode) => any) | undefined;
    onCheck?: ((node: import("./types").TreeNode, checked: boolean) => any) | undefined;
}, {
    disabled: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    expanded: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    current: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    indeterminate: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    checked: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    node: import("./types").TreeNode;
    showCheckbox: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
    hiddenExpandIcon: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
