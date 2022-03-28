import { GetterFuncs, StateStatus, StateError } from "@/store/types";
import { State } from "./state";

export type Getters = {
  isLoggedIn: (state: State) => boolean;
  authStatus: (state: State) => StateStatus;
  authError: (state: State) => StateError;
};

export const getters: GetterFuncs<State> = {
  isLoggedIn: (state: State) => !!state.token,
  authStatus: (state: State) => state.status,
  authError: (state: State) => state.error,
};
