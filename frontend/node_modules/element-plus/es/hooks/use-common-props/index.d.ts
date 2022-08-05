import type { ComponentSize } from 'element-plus/es/constants';
import type { MaybeRef } from '@vueuse/core';
export declare const useSizeProp: import("element-plus/es/utils").BuildPropReturn<StringConstructor, never, false, "default" | "small" | "large", never>;
export declare const useSize: (fallback?: MaybeRef<ComponentSize | undefined>, ignore?: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>>) => import("vue").ComputedRef<"default" | "small" | "large">;
export declare const useDisabled: (fallback?: MaybeRef<boolean | undefined>) => import("vue").ComputedRef<boolean>;
