import { HOST_URL } from "@/store";
import { ActionAugments, ActionFuncs } from "@/store/types";
import axios from "axios";
import { User } from "../auth/state";
import { MutationTypes } from "./mutations";
import {  GetDashboardResponse, State } from "./state";

export enum ActionTypes {
  GetDashboards = "GetDashboards",
}

export type Actions = {
  [ActionTypes.GetDashboards](context: ActionAugments<State>, userId: string): void;
}

export const actions: ActionFuncs<State> = {
  async [ActionTypes.GetDashboards]({ commit }) {
    commit(MutationTypes.GetDashboardsRequest);
    try {
      const resp = await axios({
        url: `${HOST_URL}/dashboards`,
        method: "GET",
      });
      const payload = resp.data as GetDashboardResponse;
      commit(MutationTypes.GetDashboardsSuccess, payload);
    } catch {
      commit(MutationTypes.GetDashboardsError);
    }
  }
}
