import { InjectionKey } from "vue";
import { createStore, useStore, Store } from "vuex";
import { auth } from "./modules/auth";
import { dashboard } from "./modules/dashboard";
import { RootState } from "./types";

export const HOST_URL = process.env.host || "http://localhost:8081/api/v1";

export const key: InjectionKey<Store<RootState>> = Symbol();

export default createStore<RootState>({
  modules: {
    auth,
    dashboard,
  },
});

export const useTypedStore = () => useStore(key);
