import { StateStatus } from "@/store/types";

export type Dashboard = {
  updatedAt: Date;
  name: string;
  authorId: string;
  id: string;
};

export type GetDashboardResponse = Array<{
  updated_at: Date;
  name: string;
  author_id: string;
  id: string;
}>;

export type State = {
  dashboard: Array<Dashboard>;
  status: StateStatus;
};

export const state: State = {
  dashboard: [],
  status: StateStatus.Loading
}
