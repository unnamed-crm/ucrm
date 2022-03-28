import { GetterFuncs, StateStatus, StateError } from "@/store/types";
import { State } from "./state";

export type Getters = {
  isLoggedIn: (state: State) => boolean;
  authStatus: (state: State) => StateStatus;
  authError: (state: State) => StateError;
};

export const getters: GetterFuncs<State> & Getters = {
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  authError: (state) => state.error,
};
