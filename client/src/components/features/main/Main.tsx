import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormView from "./components/form/FormView";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Loader from "../../loader/Loader";
import * as store from "../../../store/users/store";
import * as clarifaiStore from "./store/store";
import "../../../css/App.css";
import "../../../css/features/main/main.css";

const calculateFacesLocation = (regions: any) => {
  return regions.map((region: any) => {
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
  const [imageUrl, seImagetUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState("");
  const [faces, setFaces] = useState([]);
  const dispatch = useDispatch();
  const { token = "" } = useSelector(store.userSelectors.getUser);
  const regions = useSelector(clarifaiStore.clarifaiSelectors.getRegions);
  const url = useSelector(clarifaiStore.clarifaiSelectors.getUrl);
  const isLoadingUser = useSelector(store.userSelectors.getIsLoading);
  const isLoadingClarifai = useSelector(
    clarifaiStore.clarifaiSelectors.getIsLoading
  );
  const isLoading = isLoadingUser || isLoadingClarifai;

  useEffect(() => {
    if (regions.length) {
      setFaces(calculateFacesLocation(regions));
      store.updateEntries(dispatch)({ token });
      seImagetUrl(url);
      setInputUrl("");
    }
  }, [regions, token, url, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setInputUrl(e.target.value);
    setFaces([]);
    seImagetUrl("");
    e.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFaces([]);
    if (!inputUrl) {
      setError("Please insert a valid URL");
    }

    if (!error) {
      clarifaiStore.faceRecognition(dispatch)({ url: inputUrl, token });
    }

    e.preventDefault();
  };

  return (
    <Fragment>
      <div className="app mr-3 ml-3">
        <Rank />
        <h5 className="text-center">
          {"This App will detect faces in your pictures. Give it a try."}
        </h5>
      </div>
      <FormView
        buttonText={isLoading ? "Detecting" : "Detect"}
        buttonDisabled={isLoading ? true : false}
        url={inputUrl}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} faces={faces} />
      <Loader showIf={isLoading} />
    </Fragment>
  );
};

export default Main;
