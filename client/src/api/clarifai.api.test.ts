import { http } from "./http/http";
import * as api from "./user.api";
import * as clarifaiApi from "./clarifai.api";

describe("Clarifai API", () => {
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

  it("should call clarifai api", (done) => {
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

    http
      .post(clarifaiApi.apiUrl("/face-recognition"), { token, url })
      .then((response: any) => {
        expect(response).toMatchObject(regions);
        done();
      })
      .catch((error) => {
        apiError = error;
        done();
      });
  });
});
