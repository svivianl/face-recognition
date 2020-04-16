export type ErrorType = "face-recognition";

export interface MessageError {
  type: ErrorType;
  message: string;
}

export type StatusType = "saved" | "updated" | "deleted" | "error";

export interface Status {
  type: StatusType;
  error?: MessageError;
}

export interface ClarifaiState {
  isLoading: boolean;
  url: string;
  regions: any;
  status: Status | null;
}
