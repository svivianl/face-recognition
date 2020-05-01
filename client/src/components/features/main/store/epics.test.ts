import { ActionsObservable, StateObservable } from "redux-observable";
import { of, Subject } from "rxjs";
import * as clarifaiEpics from "./epics";
import * as actions from "./actions";
import { RootState } from "../../../../store/reducers";
import { http } from "../../../../api/http/http";
import * as api from "../../../../api/user.api";
import { saveAuthToken } from "../../../../types";

describe("Clarifai's epics", () => {
  let token: string = "";
  let apiError: string = "";

  beforeEach((done) => {
    const email = "john@doe.com";
    const password = "1234567";
    //login
    http
      .post(api.apiUrl("/signin"), { email, password })
      .then((response: any) => {
        token = response.token;
        done();
      })
      .catch((error) => {
        //register
        const name = "John Doe";
        http
          .post(api.apiUrl("/register"), { name, email, password })
          .then((response: any) => {
            token = response.token;
            done();
          })
          .catch((error) => {
            apiError = error;
            done();
          });
      });
  });

  it("dispatches actions to change url and regions", (done) => {
    saveAuthToken(token);
    const ajax = () => of({});
    const state$ = new StateObservable<RootState>(
      new Subject<RootState>(),
      undefined as any
    );
    const url = "https://samples.clarifai.com/face-det.jpg";
    const regions: any = [
      {
        bottomRow: 52.244523,
        leftCol: 21.245633,
        rightCol: 69.589236,
        topRow: 30.901453,
      },
      {
        bottomRow: 64.133796,
        leftCol: 68.25825599999999,
        rightCol: 25.463873000000003,
        topRow: 21.136338,
      },
      {
        bottomRow: 40.807223,
        leftCol: 77.968097,
        rightCol: 14.986973999999996,
        topRow: 41.064595999999995,
      },
    ];
    const expectedOutput = {
      payload: {
        regions,
        url: "https://samples.clarifai.com/face-det.jpg",
      },
      type: "Clarifai/FaceRecognitionSuccess",
    };
    const action$ = ActionsObservable.of(actions.faceRecognition({ url }));
    const faceRecognitionEpic = clarifaiEpics.default[0];
    faceRecognitionEpic(action$, state$, { ajax }).subscribe(
      (outputActions: any) => {
        expect(outputActions).toMatchObject(expectedOutput);
        done();
      }
    );
  });
});
