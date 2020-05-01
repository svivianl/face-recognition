import { http, getCancelTokenSource, subscribeApiError } from "./http/http";
import { User, Token, SignIn, Register } from "../types";
import { Observable } from "rxjs";

export const apiUrl = (path: string = "") => {
  return `${process.env.REACT_APP_SERVER_API}/api${path}`;
};

export const register$ = (userBody: Register): Observable<Token> => {
  return new Observable((subscriber) => {
    const source = getCancelTokenSource();
    const config = {
      cancelToken: source.token,
    };
    http
      .post(apiUrl("/register"), userBody, config)
      .then((response: any) => {
        subscriber.next(response);
        subscriber.complete();
      })
      .catch((error) => subscribeApiError(error)(subscriber));
    return () => {
      source.cancel();
    };
  });
};

export const signIn$ = (userBody: SignIn): Observable<Token> => {
  return new Observable((subscriber) => {
    const source = getCancelTokenSource();
    const config = {
      cancelToken: source.token,
    };
    http
      .post(apiUrl("/signin"), userBody, config)
      .then((response: any) => {
        subscriber.next(response);
        subscriber.complete();
      })
      .catch((error) => subscribeApiError(error)(subscriber));
    return () => {
      source.cancel();
    };
  });
};

export const getUser = async () => {
  const response = await http.get(apiUrl(`/user`));
  if (response.status === 200 && !response) {
    return {};
  }
  return response;
};

export const update$ = (userBody: User): Observable<User> => {
  return new Observable((subscriber) => {
    const source = getCancelTokenSource();
    const config = {
      cancelToken: source.token,
    };

    http
      .post(apiUrl("/user"), userBody, config)
      .then((response: any) => {
        subscriber.next(response);
        subscriber.complete();
      })
      .catch((error) => subscribeApiError(error)(subscriber));
    return () => {
      source.cancel();
    };
  });
};

export const updateEntries$ = (): Observable<User> => {
  return new Observable((subscriber) => {
    const source = getCancelTokenSource();
    const config = {
      cancelToken: source.token,
    };
    http
      .post(apiUrl("/user"), config)
      .then((response: any) => {
        subscriber.next(response);
        subscriber.complete();
      })
      .catch((error) => subscribeApiError(error)(subscriber));
    return () => {
      source.cancel();
    };
  });
};

export const signOut = async () => {
  const response = await http.post(apiUrl(`/signout`));
  if (response.status === 200 && !response) {
    return {};
  }
  return response;
};
