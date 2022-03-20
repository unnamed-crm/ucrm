import { MutationTree } from "vuex";
import { State, StateStatus } from "./state";

export enum MutationTypes {
  AuthRequest = "AuthRequest",
  AuthSuccess = "AuthSuccess",
  AuthError = "AuthError",
  Logout = "logout",
}


export type Mutations = {
  [MutationTypes.AuthRequest](state: State): void;
  [MutationTypes.AuthSuccess](state: State,SignInPayload):void;
  [MutationTypes.AuthError](state: State):void;
  [MutationTypes.Logout](state: State):void;
};

export const mutations:MutationTree<State> & Mutations = {
    [MutationTypes.AuthRequest](state) {
        state.status = StateStatus.Loading;
    },
    [MutationTypes.AuthSuccess](state,payload){
          state.status = StateStatus.Success;
          state.token = payload.token;
          state.user = payload.user;
    },
    [MutationTypes.AuthError](state){
        state.status = StateStatus.Error;
    },
    [MutationTypes.Logout](state){
         state.status = StateStatus.Never;
         state.token = "";
    }
}
