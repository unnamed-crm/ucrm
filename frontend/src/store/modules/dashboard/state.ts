import { StateStatus, StateError } from "@/store/types";

export type Dashboard = {
  updatedAt: Date;
  name: string;
  authorId: string;
  id: string;
};

export type GetDashboardsResponse = Array<{
  updated_at: Date;
  name: string;
  author_id: string;
  id: string;
}>;

export type State = {
  dashboards: Dashboard[];
  status: StateStatus;
  error: StateError;
};

export const state: State = {
  dashboards: [],
  status: StateStatus.Loading,
  error: null,
};
