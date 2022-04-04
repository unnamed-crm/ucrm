import { MutationFunc, StateStatus, FetchError } from "@/store/types";
import { GetDashboardsResponse, State } from "./state";

export enum MutationTypes {
  GetDashboardsRequest = "GetDashboardsRequest",
  GetDashboardsSuccess = "GetDashboardsSuccess",
  GetDashboardsError = "GetDashboardsError",
}

export type Mutations = {
  [MutationTypes.GetDashboardsRequest](state: State): void;
  [MutationTypes.GetDashboardsSuccess](state: State, payload: GetDashboardsResponse): void;
  [MutationTypes.GetDashboardsError](state: State, errorPayload: FetchError): void;
};

export const mutations: MutationFunc<State> & Mutations = {
  [MutationTypes.GetDashboardsRequest](state) {
    state.status = StateStatus.Loading;
  },
  [MutationTypes.GetDashboardsSuccess](state, payload) {
    state.dashboards = payload.map((d) => ({
      authorId: d.author_id,
      name: d.name,
      updatedAt: d.updated_at,
      id: d.id,
    }));
    state.status = StateStatus.Success;
  },
  [MutationTypes.GetDashboardsError](state, errorPayload) {
    state.status = StateStatus.Error;
    state.error = errorPayload;
  },
};
