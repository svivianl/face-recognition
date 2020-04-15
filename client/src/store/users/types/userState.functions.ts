import { User } from "../../../components/types";
import { UserState } from "./userState";

export function createUserState(): UserState {
  return {
    isLoading: false,
    user: {} as User,
    status: null,
  };
}
