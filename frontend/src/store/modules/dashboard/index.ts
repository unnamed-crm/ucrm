import { RootState } from "@/store/types";
import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { state, State } from "./state";

export const dashboard: Module<State, RootState> = {
  state,
  mutations,
  actions,
  getters,
};
