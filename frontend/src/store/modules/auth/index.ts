import { Module } from "vuex";
import { RootState } from "@/store/types";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { State, state } from "./state";

export const auth: Module<State, RootState> = {
  state,
  mutations,
  actions,
  getters,
};
