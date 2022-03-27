import { GetterFuncs } from "../../types";
import { State } from "./state";

export type Getters = {
  isLoggedIn: (state: State) => boolean;
  authStatus: (state: State) => string;
};

export const getters: GetterFuncs<State> = {
  isLoggedIn: (state: State) => !!state.token,
  authStatus: (state: State) => state.status,
};
