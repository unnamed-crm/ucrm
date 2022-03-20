
import { createStore } from "vuex";
import { authModule } from "./modules/auth";

export const HOST_URL = process.env.host || 'http://localhost:8081/api/v1'

export default createStore({
  modules: {auth: authModule},
});
