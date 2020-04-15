import { http, getCancelTokenSource, isRequestCancellation } from "./http/http";
import { User, SignIn, Token, Register } from "../types";
import { Observable } from "rxjs";

const apiUrl = (path: string = "") => {
  return `${process.env.REACT_APP_SERVER_API}/api${path}`;
};

export const register$ = (userBody: Register): Observable<User> => {
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
      .catch((error) => {
        console.log("api error: ", error);
        if (!isRequestCancellation(error)) {
          subscriber.error(error);
        }
      });
    return () => {
      source.cancel();
    };
  });
};

export const signIn$ = (userBody: SignIn): Observable<User> => {
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
      .catch((error) => {
        console.log("api error: ", error);
        if (!isRequestCancellation(error)) {
          subscriber.error(error);
        }
      });
    return () => {
      source.cancel();
    };
  });
};

export const updateEntries$ = (token: Token): Observable<User> => {
  return new Observable((subscriber) => {
    const source = getCancelTokenSource();
    const config = {
      cancelToken: source.token,
    };
    http
      .post(apiUrl("/user"), token, config)
      .then((response: any) => {
        subscriber.next(response);
        subscriber.complete();
      })
      .catch((error) => {
        console.log("api error: ", error);
        if (!isRequestCancellation(error)) {
          subscriber.error(error);
        }
      });
    return () => {
      source.cancel();
    };
  });
};

export const signOut = async (siginOutBody: Token) => {
  const response = await http.post(apiUrl(`/signout`), siginOutBody);
  if (response.status === 200 && !response.data) {
    return {};
  }
  return response.data;
};
