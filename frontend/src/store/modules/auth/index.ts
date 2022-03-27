import { Module } from "vuex";
import { RootState } from "../../types";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { State, state } from "./state";

export const authModule: Module<State,RootState> = {
  state,
  mutations,
  actions,
  getters,
};
