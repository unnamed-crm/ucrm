import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";

export type RootState = {
  version: string;
};

export type ActionAugments<S> = Omit<ActionContext<S, RootState>, "commit"> & {
  commit<K extends keyof MutationFunc<S>>(
    key: K,
    payload?: Parameters<MutationFunc<S>[K]>[1]
  ): ReturnType<MutationFunc<S>[K]>;
};

type Mutations<T> = {
  [key: string]: (state: T, payload?: any) => void;
};
type Actions<T> = {
  [key: string]: (context: ActionAugments<T>, payload?: any) => void;
};
type Getters<T> = {
  [key: string]: (state: T) => any;
};
export type MutationFunc<S> = Mutations<S> & MutationTree<S>;
export type ActionFuncs<S> = ActionTree<S, RootState> & Actions<S>;
export type GetterFuncs<S> = GetterTree<S, RootState> & Getters<S>;

export enum StateStatus {
  Loading = "loading",
  Success = "success",
  Error = "error",
  Never = "",
}
