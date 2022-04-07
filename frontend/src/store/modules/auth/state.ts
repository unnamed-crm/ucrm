import { StateStatus, StateError } from "@/store/types";

export type State = {
  status: StateStatus;
  error: StateError;
  user: User | null;
  token: string;
};

export type User = {
  id: string;
  created_at: Date;
  email: string;
  password: string;
};

export type SignInResponse = {
  user: User;
  token: string;
};

export const state: State = {
  status: StateStatus.Loading,
  error: null,
  user: null,
  token: localStorage.getItem("token") || "",
};
