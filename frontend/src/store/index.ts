import { createStore } from "vuex";
import { authModule } from "./modules/auth";
import { RootState } from "./types";

export const HOST_URL = process.env.host || "http://localhost:8081/api/v1";

export default createStore<RootState>({
  modules: { auth: authModule },
});
