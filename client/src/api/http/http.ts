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
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});

instance.interceptors.request.use(
  (config: any) => config,
  (error) => Promise.reject(error)
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
