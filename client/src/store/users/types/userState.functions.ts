import { User } from "../../../types";
import { UserState } from "./userState";

export function createUserState(): UserState {
  return {
    isLoading: false,
    token: "",
    user: {} as User,
    status: null,
  };
}
