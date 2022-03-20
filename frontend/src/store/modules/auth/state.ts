export enum StateStatus {
  Loading = "loading",
  Success = "success",
  Error = "error",
  Never = "",
}

export type State = {
  status: StateStatus;
  user: any;
  token: string;
};

export type SignInPayload = {
  user: User;
  token: string;
};

export type User = {
  id: string;
  created_at: Date;
  email: string;
  password: string;
};

export const state: State = {
  status: StateStatus.Loading,
  user: {},
  token: localStorage.getItem("token") || "",
};
