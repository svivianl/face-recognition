import { User } from "../../../types";

export type ErrorType = "get-user" | "create-user| 'delete-user";

export interface MessageError {
  type: ErrorType;
  message: string;
}

export type StatusType = "saved" | "updated" | "deleted" | "error";

export interface Status {
  type: StatusType;
  error?: MessageError;
}

export interface UserState {
  isLoading: boolean;
  user: User;
  status: Status | null;
}
