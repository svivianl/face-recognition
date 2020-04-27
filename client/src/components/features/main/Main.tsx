import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormView from "./components/form/FormView";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Loader from "../../loader/Loader";
import * as store from "../../../store/users/store";
import * as clarifaiStore from "./store/store";
import "../../../css/App.css";
import "../../../css/features/main/main.css";

const Main = () => {
  const [imageUrl, setImagetUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [inputError, setInputError] = useState("");
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
  const error = useSelector(clarifaiStore.clarifaiSelectors.getError);

  React.useEffect(() => {
    if (regions.length) {
      setFaces(regions);
      store.updateEntries(dispatch)({ token });
      setImagetUrl(url);
      setInputUrl("");
    }
  }, [regions, token, url, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError("");
    setInputUrl(e.target.value);
    setFaces([]);
    setImagetUrl("");
    e.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFaces([]);
    if (!inputUrl) {
      setInputError("Please insert a valid URL");
    }

    if (!inputError) {
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
        error={inputError || error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <FaceRecognition
        showIf={Boolean(imageUrl)}
        imageUrl={imageUrl}
        faces={faces}
      />
      <Loader showIf={isLoading} />
    </Fragment>
  );
};

export default Main;
