import { http, getCancelTokenSource, isRequestCancellation } from "./http/http";
import { ImageUrl } from "../types";
import { Observable } from "rxjs";

const apiUrl = (path: string = "") => {
  return `${process.env.REACT_APP_SERVER_API}/api/clarifai${path}`;
};

export const faceRecognition$ = (inputBody: ImageUrl): Observable<any> => {
  return new Observable((subscriber) => {
    const source = getCancelTokenSource();
    const config = {
      cancelToken: source.token,
    };
    http
      .post(apiUrl("/face-recognition"), inputBody, config)
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
