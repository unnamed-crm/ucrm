import { StateStatus } from "@/store/types";

export type State = {
  status: StateStatus;
  user: User;
  token: string;
};

export type User = {
  id: string;
  created_at: Date;
  email: string;
  password: string;
};

export type SignInPayload = {
  user: User;
  token: string;
};

export const state: State = {
  status: StateStatus.Loading,
  user: null,
  token: localStorage.getItem("token") || "",
};
