import React from "react";
import FaceRecognitionProps from "./FaceRecognitionProps";
import "../../../../../css/features/main/components/faceRecognition/faceRecognition.css";

const FaceRecognition = ({ imageUrl, faces }: FaceRecognitionProps) => {
  return (
    <div className="d-flex justify-content-center mt-3 mb-3">
      <div className="image-container position-relative">
        <img id="inputimage" alt="" src={imageUrl} />
        {faces &&
          faces.map((box, index) => (
            <div
              key={index}
              className="bounding-box"
              style={{
                top: `${box && box.topRow}%`,
                right: `${box && box.rightCol}%`,
                bottom: `${box && box.bottomRow}%`,
                left: `${box && box.leftCol}%`,
              }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
