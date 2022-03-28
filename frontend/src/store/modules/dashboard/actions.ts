import { HOST_URL } from "@/store";
import { ActionAugments, ActionFuncs, FetchError } from "@/store/types";
import axios from "axios";
import { MutationTypes } from "./mutations";
import { GetDashboardsResponse, State } from "./state";

export enum ActionTypes {
  GetDashboards = "getDashboards",
}

export type Actions = {
  [ActionTypes.GetDashboards](context: ActionAugments<State>): void;
};

export const actions: ActionFuncs<State> & Actions = {
  async [ActionTypes.GetDashboards]({ commit }) {
    commit(MutationTypes.GetDashboardsRequest);
    try {
      const response = await axios.get<GetDashboardsResponse>(
        `${HOST_URL}/dashboards`
      );

      const payload = response.data;

      commit(MutationTypes.GetDashboardsSuccess, payload);
    } catch (error) {
      commit(
        MutationTypes.GetDashboardsError,
        (error.response.data as FetchError) || null
      );
    }
  },
};
