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
  user: any;
  token: string;
};

export const state: State = {
  status: StateStatus.Loading,
  user: {},
  token: localStorage.getItem("token") || "",
};
