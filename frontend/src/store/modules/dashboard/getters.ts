import { GetterFuncs, StateStatus } from "../../types";
import { Dashboard, State } from "./state";

export type Getters = {
  dashboard: (state: State) => Array<Dashboard>;
  isSuccess: (state: State) => boolean;
};

export const getters: GetterFuncs<State> = {
  dashboard: (state: State) => state.dashboard,
  isSuccess: (state: State) => state.status !== StateStatus.Error && state.status !== StateStatus.Never,
};
