import { MutationFunc, StateStatus, FetchError } from "@/store/types";
import { State, SignInResponse } from "./state";

export enum MutationTypes {
  AuthRequest = "AuthRequest",
  AuthSuccess = "AuthSuccess",
  AuthError = "AuthError",
  Logout = "Logout",
}

export type Mutations = {
  [MutationTypes.AuthRequest](state: State): void;
  [MutationTypes.AuthSuccess](state: State, signInResponse: SignInResponse): void;
  [MutationTypes.AuthError](state: State, errorPayload: FetchError): void;
  [MutationTypes.Logout](state: State): void;
};

export const mutations: MutationFunc<State> & Mutations = {
  [MutationTypes.AuthRequest](state) {
    state.status = StateStatus.Loading;
  },
  [MutationTypes.AuthSuccess](state, { token, user }) {
    state.status = StateStatus.Success;
    state.error = null;
    state.token = token;
    state.user = user;
  },
  [MutationTypes.AuthError](state, errorPayload) {
    state.status = StateStatus.Error;
    state.error = errorPayload;
  },
  [MutationTypes.Logout](state) {
    state.status = StateStatus.Never;
    state.error = null;
    state.token = "";
  },
};
