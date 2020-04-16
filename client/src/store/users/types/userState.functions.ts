import { User } from "../../../types";
import { UserState } from "./userState";

export function createUserState(): UserState {
  return {
    isLoading: false,
    user: {} as User,
    status: null,
  };
}
