import { HOST_URL } from "@/store";
import axios from "axios";
import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import { State, User } from "./state";

export enum ActionTypes {
  Login = "login",
  Register = "register",
  Logout = "logout",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.Login](context: ActionAugments, user: any): void;
  [ActionTypes.Register](context: ActionAugments, user: any): void;
  [ActionTypes.Logout](context: ActionAugments): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.Login]({ commit }, user) {
    commit(MutationTypes.AuthRequest, user);
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
      commit(MutationTypes.AuthSuccess, { token, userFromResponse });
    } catch (err) {
      commit(MutationTypes.AuthError);
      localStorage.removeItem("token");
    }
  },
  async [ActionTypes.Register]({ commit }, user) {
    commit(MutationTypes.AuthRequest, user);
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
      commit(MutationTypes.AuthSuccess, { token, userFromResponse });
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
