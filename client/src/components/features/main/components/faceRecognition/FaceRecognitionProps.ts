export interface Box {
  topRow: number;
  rightCol: number;
  bottomRow: number;
  leftCol: number;
}

interface FaceRecognitionProps {
  imageUrl: string;
  // faces?: Box;
  faces?: Box[];
}

export default FaceRecognitionProps;
