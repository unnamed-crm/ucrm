import { MutationFunc, StateStatus } from "@/store/types";
import { GetDashboardResponse, State } from "./state";

export enum MutationTypes {
  GetDashboardsRequest = "GetDashboardsRequest",
  GetDashboardsSuccess = "GetDashboardsSuccess",
  GetDashboardsError = "GetDashboardsError",
}

export type Mutations = {
  [MutationTypes.GetDashboardsRequest](state: State): void;
  [MutationTypes.GetDashboardsSuccess](
    state: State,
    payload: GetDashboardResponse
  ): void;
  [MutationTypes.GetDashboardsError](state: State): void;
};

export const mutations: MutationFunc<State> & Mutations = {
  [MutationTypes.GetDashboardsRequest](state: State) {
    state.status = StateStatus.Loading;
  },
  [MutationTypes.GetDashboardsSuccess](
    state: State,
    payload: GetDashboardResponse
  ) {
    state.dashboard = payload.map((d) => ({
      authorId: d.author_id,
      name: d.name,
      updatedAt: d.updated_at,
      id: d.id,
    }));
    state.status = StateStatus.Success;
  },
  [MutationTypes.GetDashboardsError](state: State) {
    state.status = StateStatus.Error;
  },
};
