import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  isLoggedIn: (state: State) => boolean;
  authStatus: (state: State) => string;
};

export const getters: GetterTree<State, State> & Getters = {
  isLoggedIn: (state: State) => !!state.token,
  authStatus: (state: State) => state.status
};
