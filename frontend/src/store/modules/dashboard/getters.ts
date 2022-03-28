import { GetterFuncs, StateStatus } from "@/store/types";
import { Dashboard, State } from "./state";

export type Getters = {
  dashboards: (state: State) => Dashboard[];
  isSuccess: (state: State) => boolean;
};

export const getters: GetterFuncs<State> = {
  dashboards: (state: State) => state.dashboards,
  isSuccess: (state: State) =>
    state.status !== StateStatus.Error && state.status !== StateStatus.Never,
};
