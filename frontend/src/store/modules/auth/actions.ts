import { HOST_URL } from "@/store";
import axios from "axios";
import { ActionAugments, ActionFuncs } from "../../types";
import {  MutationTypes } from "./mutations";
import { State, User } from "./state";

export enum ActionTypes {
  Login = "login",
  Register = "register",
  Logout = "logout",
}


export type Actions = {
  [ActionTypes.Login](context: ActionAugments<State>, user: User): void;
  [ActionTypes.Register](context: ActionAugments<State>, user: User): void;
  [ActionTypes.Logout](context: ActionAugments<State>): void;
};

export const actions: ActionFuncs<State> = {
  async [ActionTypes.Login]({ commit }, user) {
    commit(MutationTypes.AuthRequest);
    try {
      const resp = await axios({
        url: `${HOST_URL}/users/sign-in`,
        data: user,
        method: "POST",
      });

      const token = resp.data.token;
      const userFromResponse = resp.data.user as User;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      commit(MutationTypes.AuthSuccess, { token, user: userFromResponse });
    } catch (err) {
      commit(MutationTypes.AuthError);
      localStorage.removeItem("token");
    }
  },
  async [ActionTypes.Register]({ commit }, user) {
    commit(MutationTypes.AuthRequest);
    try {
      const resp = await axios({
        url: `${HOST_URL}/users/sign-up`,
        data: user,
        method: "POST",
      });

      const token = resp.data.token;
      const userFromResponse = resp.data.user as User;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      commit(MutationTypes.AuthSuccess, { token, user: userFromResponse });
    } catch (err) {
      commit(MutationTypes.AuthError, err);
      localStorage.removeItem("token");
    }
  },
  [ActionTypes.Logout]({ commit }) {
    commit(MutationTypes.Logout);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  },
};
