import { ActionsObservable, StateObservable } from "redux-observable";
import { of, Subject } from "rxjs";
import * as clarifaiEpics from "./epics";
import * as actions from "./actions";
import { RootState } from "../../../../store/reducers";

describe("Clarifai's epics", () => {
  it("dispatches actions to change url and regions", (done) => {
    const ajax = () => of({});
    const state$ = new StateObservable<RootState>(
      new Subject<RootState>(),
      undefined as any
    );
    const url = "https://samples.clarifai.com/face-det.jpg";
    const token = "e1b5d5a4-7242-4ab3-89be-7417ee80b828";
    // const token = "0d48c11f-a6b0-49dc-be35-1873af9f3624";
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

    const action$ = ActionsObservable.of(
      actions.faceRecognition({ url, token })
    );

    const faceRecognitionEpic = clarifaiEpics.default[0];

    faceRecognitionEpic(action$, state$, { ajax })
      // .toArray()
      .subscribe((outputActions: any) => {
        expect(outputActions).toEqual(expectedOutput);
        done();
      });
  });
});
