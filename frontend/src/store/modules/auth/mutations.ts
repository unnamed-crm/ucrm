import { MutationType } from "../types";
import { State, StateStatus, SignInPayload } from "./state";

export enum MutationTypes {
  AuthRequest = "AuthRequest",
  AuthSuccess = "AuthSuccess",
  AuthError = "AuthError",
  Logout = "logout",
}

export interface Mutations<T extends State> extends MutationType<T> {
  [MutationTypes.AuthRequest](state: T): void;
  [MutationTypes.AuthSuccess](state: T, signInPayload: SignInPayload): void;
  [MutationTypes.AuthError](state: T): void;
  [MutationTypes.Logout](state: T): void;
}

export const mutations: Mutations<State> = {
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
