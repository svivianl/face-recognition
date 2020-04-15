import axios, { CancelTokenSource } from "axios";

function parseError(parameters: { messages: any }) {
  const messages = parameters.messages;
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages });
    } else {
      return Promise.reject({ messages: [messages] });
    }
  } else {
    return Promise.reject({ messages: ["Request error"] });
  }
}

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`
});

instance.interceptors.request.use(
  (config: any) => config,
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response.data,
  error => {
    return error.response
      ? parseError({ messages: error.response.data })
      : Promise.reject(error);
  }
);

export const getCancelTokenSource = (): CancelTokenSource => {
  const cancelToken = axios.CancelToken;
  return cancelToken.source();
};

export const isRequestCancellation = (error: any) => axios.isCancel(error);

export const http = instance;
