export interface Box {
  topRow: number;
  rightCol: number;
  bottomRow: number;
  leftCol: number;
}

interface FaceRecognitionProps {
  showIf: boolean;
  imageUrl?: string;
  faces?: Box[];
}

export default FaceRecognitionProps;
