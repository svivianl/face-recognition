import { getRegions } from "./selectors";

describe("Clarifai Selectors", () => {
  it("should return regions", () => {
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
    const mockParameters = {
      isLoading: false,
      regions,
      status: null,
      url,
    };
    const selected = getRegions.resultFunc(mockParameters);
    expect(selected).toEqual(regions);
  });
});
