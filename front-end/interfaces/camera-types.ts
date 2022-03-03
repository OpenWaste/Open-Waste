import { PredictionResponse } from "./service-types";
import { Camera } from "expo-camera";

export interface MapModalProperties{
    category:string,
    currentVisibilty:boolean,
    visibilitySetter: (value:boolean) => void
  }

export interface CameraTriggerButtonProperties {
  uriSetter: (value:any) => void,
  isPictureTakenSetter: (value:boolean) => void,
  predictionTextSetter: (predictionText:string) => void,
  predictionFetcher: (base64Image:string|undefined) => Promise<PredictionResponse>,
  camera:Camera
}

export interface PredictionTextProperties {
  predictionString: string
}

export interface PostPictureSnapButtonsProperties {
  uriSetter: (value:any) => void,
  isPictureTakenSetter: (value:boolean) => void,
  predictionTextSetter: (predictionText:string) => void,
  visibilitySetter: (value:boolean) => void
}

export interface ImageSubmissionButtonProperties {
  isPictureTaken:boolean,
  navigator:any
}

export interface PicturePreviewProperties {
  pictureURI: string
}

export interface CameraViewProperties {
  isPictureTaken:boolean,
  predictionString: string,
  modalVisibility:boolean,
  navigator:any
  cameraInstance:Camera|null
  pictureURI: string,
  cameraInstanceSetter: (instance:Camera) => void,
  modalVisibilitySetter: (value:boolean) => void,
  isPictureTakenSetter: (value:boolean) => void,
  predictionTextSetter: (predictionText:string) => void,
  uriSetter: (value:any) => void,
}
