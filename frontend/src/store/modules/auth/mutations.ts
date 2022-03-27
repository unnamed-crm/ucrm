import { MutationFunc, StateStatus } from "../../types";
import { State, SignInPayload } from "./state";

export enum MutationTypes {
  AuthRequest = "AuthRequest",
  AuthSuccess = "AuthSuccess",
  AuthError = "AuthError",
  Logout = "logout",
}

export type Mutations = {
  [MutationTypes.AuthRequest](state: State): void;
  [MutationTypes.AuthSuccess](state: State, signInPayload: SignInPayload): void;
  [MutationTypes.AuthError](state: State): void;
  [MutationTypes.Logout](state: State): void;
};

export const mutations: MutationFunc<State> & Mutations = {
  [MutationTypes.AuthRequest](state) {
    state.status = StateStatus.Loading;
  },
  [MutationTypes.AuthSuccess](state, { token, user }) {
    state.status = StateStatus.Success;
    state.token = token;
    state.user = user;
  },
  [MutationTypes.AuthError](state) {
    state.status = StateStatus.Error;
  },
  [MutationTypes.Logout](state) {
    state.status = StateStatus.Never;
    state.token = "";
  },
};
