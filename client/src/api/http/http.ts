import axios, { CancelTokenSource } from "axios";
import { prepHeaderWithAuthToken } from "./interceptors";

function parseError(parameters: { messages: any }) {
  const messages = parameters.messages;
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages });
    }
    return Promise.reject({ messages: [messages] });
  }
  return Promise.reject({ messages: ["Request error"] });
}

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});

instance.interceptors.request.use(prepHeaderWithAuthToken, (error) =>
  Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Request made and server responded
      return parseError({ messages: error.response.data });
    }

    if (error.request) {
      // The request was made but no response was received
      return Promise.reject({
        messages: [{ message: "Server is down. Please contact the admin." }],
      });
    }

    // Something happened in setting up the request that triggered an Error
    return Promise.reject(error);
  }
);

export const getCancelTokenSource = (): CancelTokenSource => {
  const cancelToken = axios.CancelToken;
  return cancelToken.source();
};

export const isRequestCancellation = (error: any) => axios.isCancel(error);

export const http = instance;

export const subscribeApiError = (error: any) => (subscriber: any) => {
  if (!isRequestCancellation(error)) {
    const message =
      error.messages && error.messages[0] && error.messages[0].message
        ? { message: error.messages[0].message }
        : error;
    subscriber.error(message);
  }
};
