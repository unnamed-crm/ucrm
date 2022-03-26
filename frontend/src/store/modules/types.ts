import { ActionContext, MutationTree } from "vuex";

export interface MutationType<M> extends MutationTree<M> {};

export type ActionAugments<T,M extends MutationType<T>> = Omit<ActionContext<T, T>, "commit"> & {
  commit<K extends keyof M>(
    key: K,
    payload?: Parameters<M[K]>[1]
  ): ReturnType<M[K]>;
};
