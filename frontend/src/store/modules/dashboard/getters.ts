import { GetterFuncs, StateStatus, StateError } from "@/store/types";
import { Dashboard, State } from "./state";

export type Getters = {
  dashboards: (state: State) => Dashboard[];
  isSuccess: (state: State) => boolean;
  dashboardsError: (state: State) => StateError;
};

export const getters: GetterFuncs<State> & Getters = {
  dashboards: (state) => state.dashboards,
  isSuccess: (state) => state.status !== StateStatus.Error && state.status !== StateStatus.Never,
  dashboardsError: (state) => state.error,
};
