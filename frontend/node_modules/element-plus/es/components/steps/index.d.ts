export declare const ElSteps: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
    space: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    active: {
        type: NumberConstructor;
        default: number;
    };
    direction: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    alignCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
    simple: {
        type: BooleanConstructor;
        default: boolean;
    };
    finishStatus: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    processStatus: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
}, {
    steps: import("vue").Ref<never[]>;
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    space: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    active: {
        type: NumberConstructor;
        default: number;
    };
    direction: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    alignCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
    simple: {
        type: BooleanConstructor;
        default: boolean;
    };
    finishStatus: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
    processStatus: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    active: number;
    direction: string;
    space: string | number;
    alignCenter: boolean;
    simple: boolean;
    finishStatus: string;
    processStatus: string;
}>> & {
    Step: import("vue").DefineComponent<{
        title: {
            type: StringConstructor;
            default: string;
        };
        icon: {
            type: import("vue").PropType<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
            default: string;
        };
        description: {
            type: StringConstructor;
            default: string;
        };
        status: {
            type: StringConstructor;
            default: string;
            validator: (val: string) => boolean;
        };
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
        index: import("vue").Ref<number>;
        lineStyle: import("vue").Ref<{}>;
        currentStatus: import("vue").ComputedRef<string>;
        isCenter: import("vue").ComputedRef<boolean>;
        isVertical: import("vue").ComputedRef<boolean>;
        isSimple: import("vue").ComputedRef<boolean>;
        isLast: import("vue").ComputedRef<boolean>;
        space: import("vue").ComputedRef<string | number>;
        style: import("vue").ComputedRef<Record<string, unknown>>;
        parent: import("./src/item.vue").IStepsInject;
        setIndex: (val: any) => void;
        calcProgress: (status: any) => void;
        updateStatus: (activeIndex: any) => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        icon: {
            type: import("vue").PropType<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
            default: string;
        };
        description: {
            type: StringConstructor;
            default: string;
        };
        status: {
            type: StringConstructor;
            default: string;
            validator: (val: string) => boolean;
        };
    }>>, {
        icon: string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>;
        title: string;
        description: string;
        status: string;
    }>;
};
export default ElSteps;
export declare const ElStep: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: import("vue").PropType<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
        default: string;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
    status: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
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
    index: import("vue").Ref<number>;
    lineStyle: import("vue").Ref<{}>;
    currentStatus: import("vue").ComputedRef<string>;
    isCenter: import("vue").ComputedRef<boolean>;
    isVertical: import("vue").ComputedRef<boolean>;
    isSimple: import("vue").ComputedRef<boolean>;
    isLast: import("vue").ComputedRef<boolean>;
    space: import("vue").ComputedRef<string | number>;
    style: import("vue").ComputedRef<Record<string, unknown>>;
    parent: import("./src/item.vue").IStepsInject;
    setIndex: (val: any) => void;
    calcProgress: (status: any) => void;
    updateStatus: (activeIndex: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: import("vue").PropType<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
        default: string;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
    status: {
        type: StringConstructor;
        default: string;
        validator: (val: string) => boolean;
    };
}>>, {
    icon: string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>;
    title: string;
    description: string;
    status: string;
}>>;
