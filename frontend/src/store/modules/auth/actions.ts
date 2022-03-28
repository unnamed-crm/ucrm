import { HOST_URL } from "@/store";
import axios from "axios";
import { ActionAugments, ActionFuncs, FetchError } from "@/store/types";
import { MutationTypes } from "./mutations";
import { State, SignInResponse } from "./state";
import { LoginData } from "@/schemas/login.schema";
import { RegisterData } from "@/schemas/register.schema";

export enum ActionTypes {
  Login = "login",
  Register = "register",
  Logout = "logout",
}

export type Actions = {
  [ActionTypes.Login](context: ActionAugments<State>, data: LoginData): void;
  [ActionTypes.Register](
    context: ActionAugments<State>,
    data: RegisterData
  ): void;
  [ActionTypes.Logout](context: ActionAugments<State>): void;
};

export const actions: ActionFuncs<State> & Actions = {
  async [ActionTypes.Login]({ commit }, data) {
    commit(MutationTypes.AuthRequest);
    try {
      const response = await axios.post<SignInResponse>(
        `${HOST_URL}/users/sign-in`,
        data
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      commit(MutationTypes.AuthSuccess, { token, user });
    } catch (error) {
      commit(
        MutationTypes.AuthError,
        (error.response.data as FetchError) || null
      );
      localStorage.removeItem("token");
    }
  },
  async [ActionTypes.Register]({ commit }, data) {
    commit(MutationTypes.AuthRequest);
    try {
      const response = await axios.post<SignInResponse>(
        `${HOST_URL}/users/sign-up`,
        data
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      commit(MutationTypes.AuthSuccess, { token, user });
    } catch (error) {
      commit(
        MutationTypes.AuthError,
        (error.response.data as FetchError) || null
      );
      localStorage.removeItem("token");
    }
  },
  [ActionTypes.Logout]({ commit }) {
    commit(MutationTypes.Logout);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  },
};
