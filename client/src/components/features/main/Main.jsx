import React, { Fragment, useEffect, useState } from "react";
import Clarifai from "clarifai";
import FormView from "./components/form/FormView";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API_KEY,
});

const calculateFacesLocation = (regions) => {
  return regions.map((region) => {
    const clarifaiFace = region.region_info.bounding_box;

    return {
      leftCol: clarifaiFace.left_col * 100,
      topRow: clarifaiFace.top_row * 100,
      rightCol: (1 - clarifaiFace.right_col) * 100,
      bottomRow: (1 - clarifaiFace.bottom_row) * 100,
    };
  });
};

const Main = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    if (isSendingForm) {
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, url)
        .then((data) => {
          setFaces(calculateFacesLocation(data.outputs[0].data.regions));
          setIsSendingForm(false);
        })
        .catch((error) => {
          setError(error);
          setIsSendingForm(false);
        });
    }
  }, [isSendingForm]);

  const handleChange = (e) => {
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUrl(e.target.value);
    setFaces([]);
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    // const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFaces([]);
    if (!url) {
      setError("Please insert a valid URL");
    }

    if (!error) {
      setIsSendingForm(true);
    }

    e.preventDefault();
  };

  return (
    <Fragment>
      <Rank />
      <FormView
        buttonText={isSendingForm ? "Detecting" : "Detect"}
        buttonDisabled={isSendingForm ? true : false}
        url={url}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <FaceRecognition imageUrl={url} faces={faces} />
    </Fragment>
  );
};

export default Main;
