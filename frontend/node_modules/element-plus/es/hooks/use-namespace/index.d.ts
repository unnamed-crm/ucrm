export declare const useNamespace: (block: string) => {
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
