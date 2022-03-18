import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
  },
  mutations: {
    authRequest(state) {
      state.status = "loading";
    },
    authSuccess(state,{ token, user }) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    authError(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {
    async login ({ commit }, user) { 
      commit("authRequest");
      try {
        const resp = await axios({
          url: "http://localhost:8081/api/v1/users/sign-in",
          data: user,
          method: "POST",
        }) 

        const token = resp.data.token;
        const userFromResponse = resp.data.user;

        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        commit("authSuccess", { token, userFromResponse });
      } catch (err) { 
        commit("authError");
        localStorage.removeItem("token");
      }
    },
    async register({ commit }, user) {
      commit("authRequest");
      try {
        const resp = await axios({
          url: "http://localhost:8081/api/v1/users/sign-up",
          data: user,
          method: "POST",
        })

        const token = resp.data.token;
        const userFromResponse = resp.data.user;

        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        commit("authSuccess", { token, userFromResponse });
      } catch (err) {
        commit("authError", err);
        localStorage.removeItem("token");
      }
    },
    async logout({ commit }) {
+     commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  modules: {},
});
