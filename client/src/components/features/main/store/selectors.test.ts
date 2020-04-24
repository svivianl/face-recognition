import { getRegions } from "./selectors";

describe("Clarifai Selectors", () => {
  it("should return regions", () => {
    const url = "https://samples.clarifai.com/face-det.jpg";
    const regions: any = [
      {
        bottom_row: 0.47755477,
        left_col: 0.21245633,
        right_col: 0.30410764,
        top_row: 0.30901453,
      },
      {
        bounding_box: {
          bottom_row: 0.35866204,
          left_col: 0.68258256,
          right_col: 0.74536127,
          top_row: 0.21136338,
        },
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
